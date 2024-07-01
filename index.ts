import 'colors';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import db_connection from 'config/db_connection';

import { config } from 'config/config';


const COOKIE_MAX_AGE = 2 * 24 * 60 * 60 * 1000; //  2 * 24 hours = 2 days

import { globalErrorMiddleware, globalNotFoundMiddleware } from '@/middlewares';
import { mountRouter } from './mount.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(
  cookieSession({
    name: config.COOKIE_NAME!,
    keys: [config.COOKIE_SECRET!],
    maxAge: COOKIE_MAX_AGE,
  }),
);

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1', mountRouter);

app.all('*', globalNotFoundMiddleware);
app.use(globalErrorMiddleware);

app.listen(config.PORT, () => {
  db_connection();
  console.log(`Server listening on port ${config.PORT}`.cyan.bold);
});

export default app;
