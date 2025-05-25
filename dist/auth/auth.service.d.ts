import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private tokenService;
    constructor(userService: UsersService, jwtService: JwtService, tokenService: TokenService);
    validateUser(email: string, password: string): Promise<{
        name: string;
        email: string;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(name: string, email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
