import 'colors';
import dotenv from 'dotenv';
import path from 'path';
// Load environment variables
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.join(__dirname, `${envFile}`) });

// ==================================================================================
// !!!!!!!!!!!!!!!!!!!!!!!!!! SAFE TO CODE AFTER THIS LINE !!!!!!!!!!!!!!!!!!!!!!!!!!
// ==================================================================================
import express, { Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieSession from 'cookie-session';
import expressWinston from 'express-winston';
import { config } from '@/common/config/config';
import { globalErrorMiddleware, NotFoundMiddleware } from '@/common/middlewares';
import { mountRouter } from '@/common/routers';
import Database from '@/common/config/db_connection';
import { logger } from '@/common/utils'; // Import the logger



const COOKIE_MAX_AGE = 2 * 24 * 60 * 60 * 1000; //  2 * 24 hours = 2 days

// Middleware factory function
const createMiddleware = <T>(middleware: (options: T) => express.RequestHandler, options: T): express.RequestHandler => {
  return middleware(options);
};

const app: Application = express();
const notFoundMiddleware = new NotFoundMiddleware();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(createMiddleware(cors, {
  origin: config.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
} as CorsOptions));

app.use(createMiddleware(cookieSession, {
  name: config.COOKIE_NAME!,
  keys: [config.COOKIE_SECRET!],
  maxAge: COOKIE_MAX_AGE,
}));

app.use(createMiddleware(expressWinston.logger, {
  winstonInstance: logger,
  meta: false,
  msg: (req: Request, res: Response) => `${req.method} ${req.url} ${res.statusCode}`,
  expressFormat: true,
  colorize: false,
}));

if (config.NODE_ENV === 'development') {
  app.use(createMiddleware(expressWinston.logger, {
    winstonInstance: logger,
    level: 'debug',
  }));
}

// Mount routers
app.use('/api/v1', mountRouter);

// Apply custom middleware
app.all('*', notFoundMiddleware.execute);
app.use(globalErrorMiddleware);

// Start server and initialize database connection
app.listen(config.PORT, () => {
  Database.getInstance(); // Singleton pattern for database initialization
  logger.info(`Server listening on port ${config.PORT}`, { context: 'Bootstrap' });
});

export default app;
