import { ApiError } from '@/common/errors';
import expressAsyncHandler from 'express-async-handler';
import {
  matchedData,
  validationResult,
  Schema,
  checkSchema,
} from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { MessageType, ResponseStatus } from '@/data/types';

export const validationMiddleware = (schema: Schema) =>
  expressAsyncHandler(async (req, _res, next) => {
    await checkSchema(schema).run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const messages: ApiError['messages'] = result.array().map((error) => ({
        message_en: error.msg,
        type: MessageType.ERROR,
      }));
      throw new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        status: ResponseStatus.ERROR,
        messages,
      });
    }

    req.body = matchedData(req, { locations: ['body'] });
    req.query = matchedData(req, { locations: ['query'] });
    req.params = matchedData(req, { locations: ['params'] });

    next();
  });
