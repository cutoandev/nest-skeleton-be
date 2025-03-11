import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseController } from 'src/core/controllers';
import { User } from 'src/core/schemas';
import { UserService } from './user.service';
import { JwtAuthWithPermissionsGuard } from '../auth/guards';
import { Permissions } from 'src/common/decorators';

@Controller('users')
export class UserController extends BaseController<User> {
  /**
   *
   */
  constructor(private readonly service: UserService) {
    super(service);
  }

  @Post()
  @Permissions('Test-Permission')
  @UseGuards(JwtAuthWithPermissionsGuard)
  async create(@Body() model: User, @Req() req: Request, @Res() res: Response) {
    return super.create(model, req, res);
  }
}
