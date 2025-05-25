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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dtos/create-task.dto");
const update_task_dto_1 = require("./dtos/update-task.dto");
const jwt_auth_gaurd_1 = require("../../auth/jwt/jwt-auth.gaurd");
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(appId, dto, req) {
        return this.taskService.createTask(appId, {
            ...dto,
            createdBy: req['user'].sub,
        });
    }
    async getTasksByAppId(appId, pageNumber = '1', pageSize = '10', req) {
        const page = parseInt(pageNumber);
        const limit = parseInt(pageSize);
        return this.taskService.getTasksPaginated(appId, page, limit, req['user'].sub);
    }
    updateTask(appId, taskId, dto, req) {
        return this.taskService.updateTask(appId, taskId, req['user'].sub, dto);
    }
    deleteTask(appId, taskId, req) {
        return this.taskService.deleteTask(appId, taskId, req['user'].sub);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(':appId/tasks'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto,
        Request]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)(':appId/tasks'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Query)('pageNumber')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Request]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasksByAppId", null);
__decorate([
    (0, common_1.Patch)(':appId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto,
        Request]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':appId/tasks/:taskId'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Request]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.AuthGuard),
    (0, common_1.Controller)('api/todo-apps'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map