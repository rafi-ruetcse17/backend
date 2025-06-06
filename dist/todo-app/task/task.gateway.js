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
exports.TaskGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_events_enum_1 = require("../../lib/enum/socket-events.enum");
let TaskGateway = class TaskGateway {
    server;
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinRoom(client, appId) {
        client.join(appId);
        console.log(`Client ${client.id} joined room ${appId}`);
    }
    emitTaskUpdated(appId, task) {
        const room = this.server.sockets.adapter.rooms.get(appId);
        const numClients = room ? room.size : 0;
        if (numClients > 0) {
            this.server.to(appId).emit(socket_events_enum_1.SocketEvents.updateTask, task);
        }
        else {
            console.log(`No clients connected to room ${appId}, skipping emit.`);
        }
    }
};
exports.TaskGateway = TaskGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TaskGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(socket_events_enum_1.SocketEvents.joinRoom),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], TaskGateway.prototype, "handleJoinRoom", null);
exports.TaskGateway = TaskGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], TaskGateway);
//# sourceMappingURL=task.gateway.js.map