import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userService } from '@/services';
import { ApiResponse, asyncUtil } from '@/utils';
import { IUser, MessageType } from '@/types';
import { NotFoundError } from '@/errors';

const createUser = asyncUtil(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body as IUser);
  const response = new ApiResponse({
    messages: [
      { message_en: 'User Created successfully', type: MessageType.SUCCESS },
    ],
    statusCode: StatusCodes.CREATED,
    data: { user },
  });
  res.status(response.statusCode).json(response);
});

const getUsers = asyncUtil(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  const response = new ApiResponse({
    messages: [
      { message_en: 'Users Fetched successfully', type: MessageType.SUCCESS },
    ],
    statusCode: StatusCodes.OK,
    data: { users },
  });
  res.status(response.statusCode).json(response);
});

const getUser = asyncUtil(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  if (!user) {
    const error = new NotFoundError([
      { message_en: 'User not found', type: MessageType.ERROR },
    ]);
    const response = new ApiResponse({
      messages:
        [
          { message_en: 'User not found', type: MessageType.ERROR },
        ],
      statusCode: error.statusCode || StatusCodes.NOT_FOUND,
      data: {},
    });
    res.status(response.statusCode).json(response);
  } else {
    res.json(user);
  }
});

const updateUser = asyncUtil(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body as IUser;
  const updatedUser = await userService.updateUser(id, userData);
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

const deleteUser = asyncUtil(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUser(id);
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

export { createUser, getUsers, getUser, updateUser, deleteUser };
