import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ToDoAppService } from './todo-app.service';
import { CreateToDoAppDto } from './dtos/create.dto';
import { InviteCollaboratorDto } from './dtos/invite.dto';
import { AuthGuard } from 'src/auth/jwt/jwt-auth.gaurd';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('api/todo-apps')
export class ToDoAppController {
  constructor(private readonly todoService: ToDoAppService) {}

  @Post('create')
  create(@Body() dto: CreateToDoAppDto) {
    return this.todoService.create(dto);
  }

  @Post('invite/:id')
  invite(
    @Param('id') appId: string,
    @Body('owner') owner: string,
    @Body() dto: InviteCollaboratorDto,
  ) {
    return this.todoService.invite(appId, owner, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { sub: string };
    if (!user?.sub) {
      throw new UnauthorizedException('Invalid user');
    }
    return this.todoService.delete(id, user.sub);
  }

  @Get('my-apps')
  getMyApps(@Req() req: Request) {
    const user = req.user as { sub: string };
    if (!user?.sub) {
      throw new UnauthorizedException('Invalid user');
    }
    return this.todoService.getAllAppsForUser(user.sub);
  }
}
