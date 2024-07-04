import { Router } from 'express';

import { UserController } from './user.controller';
import { authMiddleware, allowedTo } from '@/common/middlewares';
import { UserRole } from '@/types';

const userRouter = Router();
const userController = new UserController();

userRouter
  .route('/')
  .get(authMiddleware, allowedTo(UserRole.ADMIN), userController.getUsers)
  .post(authMiddleware, allowedTo(UserRole.ADMIN), userController.createUser);
userRouter
  .route('/:id')
  .get(authMiddleware, allowedTo(UserRole.ADMIN), userController.getUser)
  .put(authMiddleware, allowedTo(UserRole.ADMIN), userController.updateUser)
  .delete(authMiddleware, allowedTo(UserRole.ADMIN), userController.deleteUser);

export { userRouter };
