import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ToDoApp, ToDoAppDocument } from './model/todo-app.model';
import { CreateToDoAppDto } from './dtos/create.dto';
import { InviteCollaboratorDto } from './dtos/invite.dto';
import { compareObjectIds } from 'src/lib/utils/common-utils';

@Injectable()
export class ToDoAppService {
  constructor(
    @InjectModel(ToDoApp.name) private toDoModel: Model<ToDoAppDocument>,
  ) {}

  async create(userId: string, dto: CreateToDoAppDto) {
    return this.toDoModel.create({ title: dto.title, owner: userId });
  }

  async invite(
    todoAppId: string,
    owner: string,
    inviteDto: InviteCollaboratorDto,
  ) {
    const app = await this.toDoModel.findById(todoAppId);
    if (!app) throw new NotFoundException('ToDo App not found');

    if (!compareObjectIds(owner, app.owner))
      throw new ForbiddenException('Only owner can invite');

    if (compareObjectIds(owner, inviteDto.userId))
      throw new ForbiddenException('You cannot invite yourself!');

    const alreadyAdded = app.collaborators.find((c) =>
      compareObjectIds(c.userId, inviteDto.userId),
    );
    if (alreadyAdded) {
      alreadyAdded.role = inviteDto.role;
    } else {
      app.collaborators.push({
        userId: new Types.ObjectId(inviteDto.userId),
        role: inviteDto.role,
      });
    }
    return app.save();
  }

  async delete(todoAppId: string, owner: string) {
    const app = await this.toDoModel.findById(todoAppId);
    if (!app) throw new NotFoundException('ToDo App not found');
    if (!compareObjectIds(owner, app.owner))
      throw new ForbiddenException('Only owner can delete');
    return this.toDoModel.deleteOne({ _id: todoAppId });
  }

  async getAllAppsForUser(userId: string) {
    const apps = await this.toDoModel
      .find({
        $or: [
          { owner: userId },
          { 'collaborators.userId': new Types.ObjectId(userId) },
        ],
      })
      .lean();

    return apps.map((app) => {
      if (app.owner.toString() === userId) {
        return { ...app, role: 'owner' };
      }

      const collaborator = app.collaborators.find((c) =>
        compareObjectIds(c.userId, userId),
      );

      return {
        ...app,
        role: collaborator?.role,
      };
    });
  }
}
