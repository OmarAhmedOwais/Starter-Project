import { IUser, MessageType } from '@/data/types';
import { NotFoundError } from '@/common/errors';
import RepositoryFactory from '@/factories/repositoryFactory';
import BaseService from '@/base/baseService';
import { User } from '@/data/models';

export class UserService extends BaseService<IUser> {
  private userRepository = RepositoryFactory.createUserRepository();

  constructor() {
    super(User); // Pass the User model to the base class constructor
  }
  
  async findById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return user;
  }

  async update(userId: string, userData: IUser) {
    const updatedUser = await this.userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return updatedUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.userRepository.delete(userId);
    if (!deletedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return deletedUser;
  }
}

