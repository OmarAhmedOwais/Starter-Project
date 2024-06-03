import { Router } from 'express';

import { authRouter } from './auth.router';
import { specs, swaggerUi } from '@/swagger';

const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { mountRouter };
