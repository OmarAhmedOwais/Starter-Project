import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { MiddlewareFactory } from '@/factories';
import { UserService } from '@/user/services';

const authRouter = Router();
const authController = new AuthController();
// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);

const authMiddleware = middlewareFactory.createAuthMiddleware();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logout);

export { authRouter };
