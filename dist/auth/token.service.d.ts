import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateTokens(payload: any): {
        accessToken: string;
        refreshToken: string;
    };
}
