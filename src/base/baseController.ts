import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import BaseService from './baseService';     // don't work there
import { ApiResponse, asyncHandler } from '@/common/utils';
import { Document } from 'mongoose';
import { MessageType } from '@/data/types';
import { NotFoundError } from '@/common/errors';

export class BaseController<T extends Document> {
  private service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.service.create(req.body as Partial<T>);
    const response = new ApiResponse({
      messages: [{ message_en: 'Item Created successfully', type: MessageType.SUCCESS }],
      statusCode: StatusCodes.CREATED,
      data: { item },
    });
    res.status(response.statusCode).json(response);
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const query = req?.query || {};
    const { data, paginationResult } = await this.service.findAll(query);
    const response = new ApiResponse({
      messages: [{ message_en: 'Items Fetched successfully', type: MessageType.SUCCESS }],
      statusCode: StatusCodes.OK,
      data: { data, paginationResult },
    });
    res.status(response.statusCode).json(response);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await this.service.findById(id);
    if (!item) {
      const error = new NotFoundError([{ message_en: 'Item not found', type: MessageType.ERROR }]);
      const response = new ApiResponse({
        messages: [{ message_en: 'Item not found', type: MessageType.ERROR }],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
      const response = new ApiResponse({
        messages: [{ message_en: 'Item Fetched successfully', type: MessageType.SUCCESS }],
        statusCode: StatusCodes.OK,
        data: { item },
      });
      res.status(response.statusCode).json(response);
    }
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const itemData = req.body as Partial<T>;
    const updatedItem = await this.service.update(id, itemData);
    if (!updatedItem) {
      const error = new NotFoundError([{ message_en: 'Item not found', type: MessageType.ERROR }]);
      const response = new ApiResponse({
        messages: [{ message_en: 'Item not found', type: MessageType.ERROR }],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
      const response = new ApiResponse({
        messages: [{ message_en: 'Item Updated successfully', type: MessageType.SUCCESS }],
        statusCode: StatusCodes.OK,
        data: { updatedItem },
      });
      res.status(response.statusCode).json(response);
    }
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedItem = await this.service.delete(id);
    if (!deletedItem) {
      const error = new NotFoundError([{ message_en: 'Item not found', type: MessageType.ERROR }]);
      const response = new ApiResponse({
        messages: [{ message_en: 'Item not found', type: MessageType.ERROR }],
        statusCode: error.statusCode || StatusCodes.NOT_FOUND,
        data: {},
      });
      res.status(response.statusCode).json(response);
    } else {
      const response = new ApiResponse({
        messages: [{ message_en: 'Item Deleted successfully', type: MessageType.SUCCESS }],
        statusCode: StatusCodes.OK,
        data: { deletedItem },
      });
      res.status(response.statusCode).json(response);
    }
  });
}

export default BaseController;
