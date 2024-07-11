import { Router } from 'express';

import { authRouter } from '../authentication/routes/auth.router';
import { userRouter } from '@/user/routes';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/users', userRouter);

export { mountRouter };
