import { Router } from 'express';

import { authRouter } from '../authentication/auth.router';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);

export { mountRouter };
