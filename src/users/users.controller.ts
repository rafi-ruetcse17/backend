import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/jwt/jwt-auth.gaurd';

@UseGuards(AuthGuard)
@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
