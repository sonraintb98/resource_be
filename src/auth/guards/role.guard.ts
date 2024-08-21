import { ExecutionContext, CanActivate, Type, mixin } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import RequestWithUser from '../request-with-user.interface';
import { JwtAuthGuard } from './jwt.guard';

export function RoleGuard(roles: Role[]): Type<CanActivate> {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
}
