import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(appId: string, dto: CreateTaskDto, req: Request): Promise<import("../model/inner-schema/task.model").Task | undefined>;
    getTasksByAppId(appId: string, pageNumber: string | undefined, pageSize: string | undefined, req: Request): Promise<{
        totalCount: any;
        tasks: any;
        role: import("../enum/role.enum").CollaboratorRole;
        page: number;
        pageSize: number;
    }>;
    updateTask(appId: string, taskId: string, dto: UpdateTaskDto, req: Request): Promise<any>;
    deleteTask(appId: string, taskId: string, req: Request): Promise<{
        message: string;
    }>;
}
