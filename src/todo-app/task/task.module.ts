import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoApp, ToDoAppSchema } from '../model/todo-app.model';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDoApp.name, schema: ToDoAppSchema }]),
  ],
  providers: [TaskService, TaskGateway],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
