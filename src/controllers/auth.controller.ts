import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse, asyncUtil } from '@/utils';
import { authService } from '@/services'; // Import authService
import { MessageType, registerBody } from '@/types';

export const register = asyncUtil(async (req: Request, res: Response) => {
  const userBody = req.body as registerBody;
  const { newUser, token } = await authService.registerUser(userBody);

  req.session = { token };

  const response = new ApiResponse({
    messages: [
      { message_en: 'registered successfully', type: MessageType.SUCCESS },
    ],
    statusCode: StatusCodes.CREATED,
    data: { newUser },
  });

  res.status(response.statusCode).json(response);
});

export const login = asyncUtil(async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  const { user, token } = await authService.login(phone, password);

  req.session = { token };

  const response = new ApiResponse({
    messages: [
      { message_en: 'logged in successfully', type: MessageType.SUCCESS },
    ],
    statusCode: StatusCodes.OK,
    data: { user },
  });

  res.status(response.statusCode).json(response);
});

export const logout = asyncUtil(async (req: Request, res: Response) => {
  await authService.logout();

  req.session = null;

  const response = new ApiResponse({
    messages: [
      { message_en: 'logged out successfully', type: MessageType.SUCCESS },
    ],
    statusCode: StatusCodes.OK,
    data: {},
  });

  res.status(response.statusCode).json(response);
});
