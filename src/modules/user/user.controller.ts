import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserService } from '../services/user.service';
import { ApiResponse, asyncHandler } from '@/common/utils';
import { IUser, MessageType } from '@/data/types';
import { NotFoundError } from '@/common/errors';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body as IUser);
    const response = new ApiResponse({
      messages: [
        { message_en: 'User Created successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.CREATED,
      data: { user },
    });
    res.status(response.statusCode).json(response);
  });

  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const query = req?.query || {};
    const users = await this.userService.findAll(query);
    const response = new ApiResponse({
      messages: [
        { message_en: 'Users Fetched successfully', type: MessageType.SUCCESS },
      ],
      statusCode: StatusCodes.OK,
      data: { users },
    });
    res.status(response.statusCode).json(response);
  });

  getUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    if (!user) {
      const error = new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
      const response = new ApiResponse({
        messages: [
          { message_en: 'User not found', type: MessageType.ERROR },
        ],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
        const response = new ApiResponse({
        messages: [
          { message_en: 'User Fetched successfully', type: MessageType.SUCCESS },
        ],
        statusCode: StatusCodes.OK,
        data: { user },
        });
      res.status(response.statusCode).json(response);
    }
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body as IUser;
    const updatedUser = await this.userService.update(id, userData);
    if (!updatedUser) {
      const error = new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
      const response = new ApiResponse({
        messages: [
          { message_en: 'User not found', type: MessageType.ERROR },
        ],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
      const response = new ApiResponse({
        messages: [
          { message_en: 'User Updated successfully', type: MessageType.SUCCESS },
        ],
        statusCode: StatusCodes.OK,
        data: { updatedUser },
      });
      res.status(response.statusCode).json(response);
    }
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) {
      const error = new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
      const response = new ApiResponse({
        messages: [
          { message_en: 'User not found', type: MessageType.ERROR },
        ],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
      const response = new ApiResponse({
        messages: [
          { message_en: 'User Deleted successfully', type: MessageType.SUCCESS },
        ],
        statusCode: StatusCodes.OK,
        data: { deletedUser },
      });
      res.status(response.statusCode).json(response);
    }
  });
}
