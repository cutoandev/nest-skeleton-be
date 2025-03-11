import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/common/types';

@Injectable()
export class JwtAuthWithPermissionsGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(context)) as boolean;
    if (!isAuthenticated) {
      throw new UnauthorizedException('Token hết hạn hoặc không đúng');
    }

    // Check required permissions
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    // Get user data
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user || !user.permissions) {
      throw new ForbiddenException('Chưa cấu hình phân quyền');
    }

    // Check super admin
    if (user.permissions.includes('***')) {
      return true;
    }

    // Validate required permissions
    const hasPermission = requiredPermissions.some((perm) =>
      user.permissions.includes(perm),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    return true;
  }
}
