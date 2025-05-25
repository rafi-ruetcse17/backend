import { Model } from 'mongoose';
import { ToDoAppDocument } from '../model/todo-app.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { CollaboratorRole } from '../enum/role.enum';
import { TaskGateway } from './task.gateway';
export declare class TaskService {
    private readonly toDoModel;
    private readonly taskGateway;
    constructor(toDoModel: Model<ToDoAppDocument>, taskGateway: TaskGateway);
    createTask(appId: string, dto: CreateTaskDto): Promise<import("../model/inner-schema/task.model").Task | undefined>;
    getTasksPaginated(appId: string, page: number, limit: number, userId: string): Promise<{
        totalCount: any;
        tasks: any;
        role: CollaboratorRole;
        page: number;
        pageSize: number;
    }>;
    updateTask(appId: string, taskId: string, userId: string, dto: UpdateTaskDto): Promise<any>;
    deleteTask(appId: string, taskId: string, userId: string): Promise<{
        message: string;
    }>;
}
