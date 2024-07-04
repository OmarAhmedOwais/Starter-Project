// global environment variables

import { IUser } from '@/types';

// express
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
