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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoAppSchema = exports.ToDoApp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const collaborator_model_1 = require("./inner-schema/collaborator.model");
const task_model_1 = require("./inner-schema/task.model");
let ToDoApp = class ToDoApp {
    title;
    description;
    owner;
    collaborators;
    tasks;
};
exports.ToDoApp = ToDoApp;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ToDoApp.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ToDoApp.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ToDoApp.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [collaborator_model_1.CollaboratorSchema], default: [] }),
    __metadata("design:type", Array)
], ToDoApp.prototype, "collaborators", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [task_model_1.Task], default: [] }),
    __metadata("design:type", Array)
], ToDoApp.prototype, "tasks", void 0);
exports.ToDoApp = ToDoApp = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ToDoApp);
exports.ToDoAppSchema = mongoose_1.SchemaFactory.createForClass(ToDoApp);
//# sourceMappingURL=todo-app.model.js.map