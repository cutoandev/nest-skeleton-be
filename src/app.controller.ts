import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Permissions } from './common/decorators/jwt-permission.decorator';
import { JwtAuthWithPermissionsGuard } from './modules/auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
