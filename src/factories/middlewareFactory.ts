import { UserRole } from '@/data/types';
import { AuthMiddleware, AllowedToMiddleware } from '@/common/middlewares';
import { UserService } from '@/user/services';

class MiddlewareFactory {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createAuthMiddleware() {
    return new AuthMiddleware(this.userService).execute;
  }

  createAllowedToMiddleware(...roles: UserRole[]) {
    return new AllowedToMiddleware(roles).execute;
  }
}

export { MiddlewareFactory };
