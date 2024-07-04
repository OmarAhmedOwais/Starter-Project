// global environment variables

import { IUser } from '@/data/types';

// express
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
