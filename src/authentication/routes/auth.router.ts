import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '@/common/middlewares';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logout);

export { authRouter };
