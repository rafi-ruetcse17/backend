import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ToDoApp, ToDoAppDocument } from '../model/todo-app.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from 'src/lib/enum/task-status.enum';
import { canEdit } from './utils/permission.utils';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(ToDoApp.name)
    private readonly toDoModel: Model<ToDoAppDocument>,
  ) {}

  async createTask(appId: string, dto: CreateTaskDto) {
    const app = await this.toDoModel.findById(appId);
    if (!app) throw new NotFoundException('ToDoApp not found');
    if (!canEdit(app, dto.createdBy))
      throw new UnauthorizedException('You are not allowed to create tasks');

    const task = {
      title: dto.title,
      description: dto.description,
      status: TaskStatus.IN_PROGRESS,
      createdBy: new Types.ObjectId(dto.createdBy),
    };

    const updatedApp = await this.toDoModel.findByIdAndUpdate(
      appId,
      { $push: { tasks: task } },
      { new: true, projection: { tasks: { $slice: -1 } } },
    );

    return updatedApp?.tasks[updatedApp.tasks.length - 1];
  }

  async getTasksPaginated(appId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const result = await this.toDoModel.aggregate([
      { $match: { _id: new Types.ObjectId(appId) } },
      {
        $project: {
          totalCount: { $size: '$tasks' },
          tasks: { $slice: ['$tasks', skip, limit] },
        },
      },
    ]);

    if (!result.length) throw new NotFoundException('ToDoApp not found');

    return {
      totalCount: result[0].totalCount,
      tasks: result[0].tasks,
      page,
      pageSize: limit,
    };
  }

  async updateTask(
    appId: string,
    taskId: string,
    userId: string,
    dto: UpdateTaskDto,
  ) {
    const app = await this.toDoModel.findById(appId);
    if (!app) throw new NotFoundException('ToDoApp not found');
    if (!canEdit(app, userId))
      throw new UnauthorizedException('You are not allowed to create tasks');

    const updatedApp = await this.toDoModel.findOneAndUpdate(
      {
        _id: appId,
        'tasks._id': new Types.ObjectId(taskId),
      },
      {
        $set: {
          'tasks.$.title': dto.title,
          'tasks.$.description': dto.description,
          'tasks.$.status': dto.status,
        },
      },
      { new: true },
    );

    if (!updatedApp) throw new NotFoundException('Task or ToDoApp not found');

    return (updatedApp.tasks as any[]).find(
      (task) => task._id.toString() === taskId,
    );
  }

  async deleteTask(appId: string, taskId: string, userId: string) {
    const app = await this.toDoModel.findById(appId);
    if (!app) throw new NotFoundException('ToDoApp not found');
    if (!canEdit(app, userId))
      throw new UnauthorizedException('You are not allowed to create tasks');

    const result = await this.toDoModel.findByIdAndUpdate(
      appId,
      { $pull: { tasks: { _id: new Types.ObjectId(taskId) } } },
      { new: true },
    );

    if (!result) throw new NotFoundException('ToDoApp or task not found');

    return { message: 'Task deleted' };
  }
}
