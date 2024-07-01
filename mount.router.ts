import { Router } from 'express';

import { authRouter } from './src/authentication/auth.router';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);

export { mountRouter };
