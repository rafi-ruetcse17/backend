import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvents } from 'src/lib/enum/socket-events.enum';

@WebSocketGateway({ cors: true })
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(SocketEvents.joinRoom)
  handleJoinRoom(client: Socket, appId: string) {
    client.join(appId);
    console.log(`Client ${client.id} joined room ${appId}`);
  }

  emitTaskUpdated(appId: string, task: any) {
    const room = this.server.sockets.adapter.rooms.get(appId);

    const numClients = room ? room.size : 0;

    if (numClients > 0) {
      this.server.to(appId).emit(SocketEvents.updateTask, task);
    } else {
      console.log(`No clients connected to room ${appId}, skipping emit.`);
    }
  }
}
