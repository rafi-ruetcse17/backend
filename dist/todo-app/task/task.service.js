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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_app_model_1 = require("../model/todo-app.model");
const task_status_enum_1 = require("../../lib/enum/task-status.enum");
const permission_utils_1 = require("./utils/permission.utils");
const role_enum_1 = require("../enum/role.enum");
const task_gateway_1 = require("./task.gateway");
let TaskService = class TaskService {
    toDoModel;
    taskGateway;
    constructor(toDoModel, taskGateway) {
        this.toDoModel = toDoModel;
        this.taskGateway = taskGateway;
    }
    async createTask(appId, dto) {
        const app = await this.toDoModel.findById(appId);
        if (!app)
            throw new common_1.NotFoundException('ToDoApp not found');
        if (!(0, permission_utils_1.canEdit)(app, dto.createdBy))
            throw new common_1.UnauthorizedException('You are not allowed to create tasks');
        const task = {
            title: dto.title,
            description: dto.description,
            status: task_status_enum_1.TaskStatus.IN_PROGRESS,
            createdBy: new mongoose_2.Types.ObjectId(dto.createdBy),
        };
        const updatedApp = await this.toDoModel.findByIdAndUpdate(appId, { $push: { tasks: task } }, { new: true, projection: { tasks: { $slice: -1 } } });
        return updatedApp?.tasks[updatedApp.tasks.length - 1];
    }
    async getTasksPaginated(appId, page, limit, userId) {
        const skip = (page - 1) * limit;
        const result = await this.toDoModel.aggregate([
            { $match: { _id: new mongoose_2.Types.ObjectId(appId) } },
            { $unwind: { path: '$tasks', preserveNullAndEmptyArrays: true } },
            { $sort: { 'tasks.createdAt': -1 } },
            {
                $group: {
                    _id: '$_id',
                    tasks: { $push: '$tasks' },
                    totalCount: {
                        $sum: { $cond: [{ $ifNull: ['$tasks', false] }, 1, 0] },
                    },
                    owner: { $first: '$owner' },
                    collaborators: { $first: '$collaborators' },
                },
            },
            {
                $project: {
                    tasks: { $slice: ['$tasks', skip, limit] },
                    totalCount: 1,
                    collaborators: 1,
                    owner: 1,
                },
            },
        ]);
        if (!result.length)
            throw new common_1.NotFoundException('No task found');
        const { totalCount, tasks, owner, collaborators } = result[0];
        let role = role_enum_1.CollaboratorRole.VIEWER;
        if (owner.toString() === userId.toString()) {
            role = role_enum_1.CollaboratorRole.OWNER;
        }
        else {
            const matchedCollaborator = collaborators.find((collab) => collab.userId.toString() === userId.toString());
            if (matchedCollaborator) {
                role = matchedCollaborator.role;
            }
        }
        return {
            totalCount,
            tasks,
            role,
            page,
            pageSize: limit,
        };
    }
    async updateTask(appId, taskId, userId, dto) {
        const app = await this.toDoModel.findById(appId);
        if (!app)
            throw new common_1.NotFoundException('ToDoApp not found');
        if (!(0, permission_utils_1.canEdit)(app, userId))
            throw new common_1.UnauthorizedException('You are not allowed to create tasks');
        const updatedApp = await this.toDoModel.findOneAndUpdate({
            _id: appId,
            'tasks._id': new mongoose_2.Types.ObjectId(taskId),
        }, {
            $set: {
                'tasks.$.title': dto.title,
                'tasks.$.description': dto.description,
                'tasks.$.status': dto.status,
            },
        }, { new: true });
        if (!updatedApp)
            throw new common_1.NotFoundException('Task or ToDoApp not found');
        const updatedTask = updatedApp.tasks.find((task) => task._id.toString() === taskId);
        this.taskGateway.emitTaskUpdated(appId, updatedTask);
        return updatedTask;
    }
    async deleteTask(appId, taskId, userId) {
        const app = await this.toDoModel.findById(appId);
        if (!app)
            throw new common_1.NotFoundException('ToDoApp not found');
        if (!(0, permission_utils_1.canEdit)(app, userId))
            throw new common_1.UnauthorizedException('You are not allowed to create tasks');
        const result = await this.toDoModel.findByIdAndUpdate(appId, { $pull: { tasks: { _id: new mongoose_2.Types.ObjectId(taskId) } } }, { new: true });
        if (!result)
            throw new common_1.NotFoundException('ToDoApp or task not found');
        return { message: 'Task deleted' };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_app_model_1.ToDoApp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        task_gateway_1.TaskGateway])
], TaskService);
//# sourceMappingURL=task.service.js.map