"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoAppModule = void 0;
const common_1 = require("@nestjs/common");
const todo_app_service_1 = require("./todo-app.service");
const todo_app_controller_1 = require("./todo-app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const todo_app_model_1 = require("./model/todo-app.model");
let TodoAppModule = class TodoAppModule {
};
exports.TodoAppModule = TodoAppModule;
exports.TodoAppModule = TodoAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: todo_app_model_1.ToDoApp.name, schema: todo_app_model_1.ToDoAppSchema }]),
        ],
        providers: [todo_app_service_1.ToDoAppService],
        controllers: [todo_app_controller_1.ToDoAppController],
        exports: [todo_app_service_1.ToDoAppService],
    })
], TodoAppModule);
//# sourceMappingURL=todo-app.module.js.map