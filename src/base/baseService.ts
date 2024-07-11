import { Document, Model } from 'mongoose';
import { ApiError } from '../common/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { ApiFeatures } from '../common/utils/ApiFeatures';
import { QueryBuilder } from '../common/utils/queryBuilder';
import { BaseRepository } from './baseRepository';

class BaseService<T extends Document> {
  private repository: BaseRepository<T>;

  constructor(model: Model<T>) {
    this.repository = new BaseRepository<T>(model);
  }

  async findAll(query: any, populate: string[] = [''], fields: string = '-__v') {
    const queryBuilder = new QueryBuilder().addFilter(query).build();
    const mongoQuery = this.repository.findAll(queryBuilder).select(fields);

    if (populate.length > 0 && populate[0] !== '') {
      query.populate = query?.populate ? query.populate.concat(populate.join(',')) : populate.join(',');
    }

    const { data, paginationResult } = await new ApiFeatures(mongoQuery, query)
      .populate()
      .filter()
      .limitFields()
      .search()
      .sort()
      .paginate();

    let modifiedData = data;

    if (query.keywordNew && query.keywordNew['qualities.values.value_en']) {
      const keywordNewValues = Array.isArray(query.keywordNew['qualities.values.value_en'])
        ? query.keywordNew['qualities.values.value_en']
        : [query.keywordNew['qualities.values.value_en']];

      modifiedData.forEach((item: any) => {
        item.qualities = item.qualities.filter((quality: any) => {
          const values = quality.values.map((value: any) => value.value_en);
          return keywordNewValues.every((keyword: string) => values.includes(keyword));
        });
      });

      modifiedData = modifiedData.filter((item: any) => item.qualities.length > 0);
    }

    return { data: modifiedData, paginationResult };
  }

  async findOne(query = {}): Promise<T | null> {
    return await this.repository.findOne(query);
  }

  async findById(id: string, populate: string[] = [''], fields: string = '-__v') {
    const query = this.repository.findById(id).select(fields);
    const document = populate.length > 0 && populate[0] !== '' ? await query.populate(populate) : await query;

    if (!document) {
      throw new ApiError(
        {
          en: 'Not Found Any Result',
          ar: 'لا يوجد اي نتيجة',
        },
        StatusCodes.NOT_FOUND
      );
    }

    return document;
  }

  async getOneBySlug(slug: string, populate: string[] = [''], fields: string = '-__v') {
    const [key, value] = slug.split('=');
    const queryBuilder = new QueryBuilder().addFilter({ [key]: value }).build();
    const query = this.repository.findOne(queryBuilder).select(fields);
    const document = populate.length > 0 && populate[0] !== '' ? await query.populate(populate) : await query;

    if (!document) {
      throw new ApiError(
        {
          en: 'Not Found Any Result For This req.body',
          ar: 'req.body لا يوجد اي نتيجة بهذا باستخدم',
        },
        StatusCodes.NOT_FOUND
      );
    }

    return document;
  }

  async create(item: Partial<T>): Promise<T> {
    return await this.repository.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const document = await this.repository.update(id, item);

    if (!document) {
      throw new ApiError(
        {
          en: 'Not Found Any Result',
          ar: 'لا يوجد اي نتيجة',
        },
        StatusCodes.NOT_FOUND
      );
    }

    return document;
  }

  async delete(id: string): Promise<T | null> {
    const document = await this.repository.delete(id);

    if (!document) {
      throw new ApiError(
        {
          en: 'Not Found Any Result',
          ar: 'لا يوجد اي نتيجة',
        },
        StatusCodes.NOT_FOUND
      );
    }
    return document;
  }
}

export default BaseService;
