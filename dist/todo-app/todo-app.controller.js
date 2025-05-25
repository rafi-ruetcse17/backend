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
exports.ToDoAppController = void 0;
const common_1 = require("@nestjs/common");
const todo_app_service_1 = require("./todo-app.service");
const create_dto_1 = require("./dtos/create.dto");
const invite_dto_1 = require("./dtos/invite.dto");
const jwt_auth_gaurd_1 = require("../auth/jwt/jwt-auth.gaurd");
let ToDoAppController = class ToDoAppController {
    todoService;
    constructor(todoService) {
        this.todoService = todoService;
    }
    create(dto, req) {
        const user = req.user;
        return this.todoService.create(user.sub, dto);
    }
    invite(appId, dto, req) {
        const user = req.user;
        return this.todoService.invite(appId, user.sub, dto);
    }
    delete(id, req) {
        const user = req.user;
        if (!user?.sub) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        return this.todoService.delete(id, user.sub);
    }
    getMyApps(req) {
        const user = req.user;
        if (!user?.sub) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        return this.todoService.getAllAppsForUser(user.sub);
    }
};
exports.ToDoAppController = ToDoAppController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateToDoAppDto, Object]),
    __metadata("design:returntype", void 0)
], ToDoAppController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('invite/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, invite_dto_1.InviteCollaboratorDto, Object]),
    __metadata("design:returntype", void 0)
], ToDoAppController.prototype, "invite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ToDoAppController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('my-apps'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ToDoAppController.prototype, "getMyApps", null);
exports.ToDoAppController = ToDoAppController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.AuthGuard),
    (0, common_1.Controller)('api/todo-apps'),
    __metadata("design:paramtypes", [todo_app_service_1.ToDoAppService])
], ToDoAppController);
//# sourceMappingURL=todo-app.controller.js.map