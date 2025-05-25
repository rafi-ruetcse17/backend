import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, import("./model/users.model").UserDocument, {}> & import("./model/users.model").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
