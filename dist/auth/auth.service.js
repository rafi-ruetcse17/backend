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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("./token.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    tokenService;
    constructor(userService, jwtService, tokenService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
    async login(user) {
        const payload = { sub: user._id, email: user.email };
        return this.tokenService.generateTokens(payload);
    }
    async register(name, email, password) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.create({
            name,
            email,
            password: hashedPassword,
        });
        const payload = { sub: user._id, email: user.email };
        return this.tokenService.generateTokens(payload);
    }
    async refreshToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            const user = await this.userService.findById(payload.sub);
            return this.login(user);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map