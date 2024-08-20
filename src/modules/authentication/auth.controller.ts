import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse, asyncHandler } from '@/common/utils';
import { AuthService } from '../services/auth.service';
import { MessageType, registerBody } from '@/data/types';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  register = asyncHandler(async (req: Request, res: Response) => {
    const userBody = req.body as registerBody;
    const { newUser, token } = await this.authService.registerUser(userBody);
    const response = new ApiResponse({
      messages: [
        { message_en: 'registered successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.CREATED,
      data: { newUser, token },
    });

    res.status(response.statusCode).json(response);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    const { user, token } = await this.authService.login(phone, password);

    const response = new ApiResponse({
      messages: [
        { message_en: 'logged in successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.OK,
      data: { user, token },
    });

    res.status(response.statusCode).json(response);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    await this.authService.logout();

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
}
