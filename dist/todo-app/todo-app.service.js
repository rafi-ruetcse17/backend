"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoAppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_app_model_1 = require("./model/todo-app.model");
const common_utils_1 = require("../lib/utils/common-utils");
let ToDoAppService = class ToDoAppService {
    toDoModel;
    constructor(toDoModel) {
        this.toDoModel = toDoModel;
    }
    async create(userId, dto) {
        return this.toDoModel.create({ title: dto.title, owner: userId });
    }
    async invite(todoAppId, owner, inviteDto) {
        const app = await this.toDoModel.findById(todoAppId);
        if (!app)
            throw new common_1.NotFoundException('ToDo App not found');
        if (!(0, common_utils_1.compareObjectIds)(owner, app.owner))
            throw new common_1.ForbiddenException('Only owner can invite');
        if ((0, common_utils_1.compareObjectIds)(owner, inviteDto.userId))
            throw new common_1.ForbiddenException('You cannot invite yourself!');
        const alreadyAdded = app.collaborators.find((c) => (0, common_utils_1.compareObjectIds)(c.userId, inviteDto.userId));
        if (alreadyAdded) {
            alreadyAdded.role = inviteDto.role;
        }
        else {
            app.collaborators.push({
                userId: new mongoose_2.Types.ObjectId(inviteDto.userId),
                role: inviteDto.role,
            });
        }
        await app.save();
        return { message: 'Collaborator invited successfully' };
    }
    async delete(todoAppId, owner) {
        const app = await this.toDoModel.findById(todoAppId);
        if (!app)
            throw new common_1.NotFoundException('ToDo App not found');
        if (!(0, common_utils_1.compareObjectIds)(owner, app.owner))
            throw new common_1.ForbiddenException('Only owner can delete');
        return this.toDoModel.deleteOne({ _id: todoAppId });
    }
    async getAllAppsForUser(userId) {
        const apps = await this.toDoModel
            .find({
            $or: [
                { owner: userId },
                { 'collaborators.userId': new mongoose_2.Types.ObjectId(userId) },
            ],
        })
            .sort({ createdAt: -1 })
            .lean();
        return apps.map((app) => {
            const { tasks, collaborators, ...neccessaryAppProps } = app;
            if (app.owner.toString() === userId) {
                return { ...neccessaryAppProps, role: 'owner' };
            }
            const collaborator = collaborators.find((c) => (0, common_utils_1.compareObjectIds)(c.userId, userId));
            return {
                ...neccessaryAppProps,
                role: collaborator?.role,
            };
        });
    }
};
exports.ToDoAppService = ToDoAppService;
exports.ToDoAppService = ToDoAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_app_model_1.ToDoApp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ToDoAppService);
//# sourceMappingURL=todo-app.service.js.map