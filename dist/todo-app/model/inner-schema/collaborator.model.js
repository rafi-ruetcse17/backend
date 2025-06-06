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
exports.CollaboratorSchema = exports.Collaborator = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_enum_1 = require("../../enum/role.enum");
let Collaborator = class Collaborator {
    userId;
    role;
};
exports.Collaborator = Collaborator;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Collaborator.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(role_enum_1.CollaboratorRole),
        default: role_enum_1.CollaboratorRole.VIEWER,
    }),
    __metadata("design:type", String)
], Collaborator.prototype, "role", void 0);
exports.Collaborator = Collaborator = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Collaborator);
exports.CollaboratorSchema = mongoose_1.SchemaFactory.createForClass(Collaborator);
//# sourceMappingURL=collaborator.model.js.map