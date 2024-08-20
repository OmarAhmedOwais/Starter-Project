import { Model, Document } from 'mongoose';
import { Models } from '@/data/types';
import { Product, User } from '@/data/models';
import { UserService } from '@/modules/user/user.service';
import { ProductService } from '@/Product/services/product.service';
import BaseService from '@/base/baseService';

class ServiceFactory {
  static createService<T extends Document>(model: Model<T>): BaseService<T> {
    switch (model.modelName) {
      case Models.User:
        return new UserService() as unknown as BaseService<T>;
      case Models.Product:
        return new ProductService() as unknown as BaseService<T>;
      default:
        return new BaseService(model);
    }
  }
}

export default ServiceFactory;
