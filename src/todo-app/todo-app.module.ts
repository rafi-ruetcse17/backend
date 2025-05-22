import { Module } from '@nestjs/common';
import { ToDoAppService } from './todo-app.service';
import { ToDoAppController } from './todo-app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoApp, ToDoAppSchema } from './model/todo-app.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDoApp.name, schema: ToDoAppSchema }]),
  ],
  providers: [ToDoAppService],
  controllers: [ToDoAppController],
  exports: [ToDoAppService],
})
export class TodoAppModule {}
