import { Router } from 'express';
import { AuthController } from '@/controllers'; // Adjust the import path as necessary
import { authMiddleware } from '@/middlewares';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logout);

export { authRouter };
