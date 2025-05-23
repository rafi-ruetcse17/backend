import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthGuard } from 'src/auth/jwt/jwt-auth.gaurd';

@UseGuards(AuthGuard)
@Controller('api/todo-apps')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':appId/tasks')
  createTask(
    @Param('appId') appId: string,
    @Body() dto: CreateTaskDto,
    @Req() req: Request,
  ) {
    return this.taskService.createTask(appId, {
      ...dto,
      createdBy: req['user'].sub,
    });
  }

  @Get(':appId/tasks')
  async getTasksByAppId(
    @Param('appId') appId: string,
    @Query('pageNumber') pageNumber = '1',
    @Query('pageSize') pageSize = '10',
    @Req() req: Request,
  ) {
    const page = parseInt(pageNumber);
    const limit = parseInt(pageSize);
    return this.taskService.getTasksPaginated(
      appId,
      page,
      limit,
      req['user'].sub,
    );
  }

  @Patch(':appId/tasks/:taskId')
  updateTask(
    @Param('appId') appId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.taskService.updateTask(appId, taskId, req['user'].sub, dto);
  }

  @Delete(':appId/tasks/:taskId')
  deleteTask(
    @Param('appId') appId: string,
    @Param('taskId') taskId: string,
    @Req() req: Request,
  ) {
    return this.taskService.deleteTask(appId, taskId, req['user'].sub);
  }
}
