import { Router } from 'express';

import { authRouter } from '../authentication/routes/auth.router';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);

export { mountRouter };
