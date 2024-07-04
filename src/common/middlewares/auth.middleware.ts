import expressAsyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/common/errors';
import { verifyToken } from '@/common/utils';
import { UserService } from '../../user/services/user.service';

const userService = new UserService();
export const authMiddleware = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
  
   // check if there is a token in the request header and it starts with Bearer
   const isTokenExist = req.headers.authorization?.startsWith('Bearer');
   if (!isTokenExist) {

      throw new UnauthorizedError('please login to first to get access','يرجى تسجيل الدخول أولاً');
   }

   // get the token from the request header
   const token = req.headers.authorization?.split(' ')[1];

  
    const { id } = verifyToken(token);

    const user = await userService.getUser(id);

    if (!user) {
      throw new UnauthorizedError('Your Account is not exist');
    }

    req.user = user;

    next();
  },
);
