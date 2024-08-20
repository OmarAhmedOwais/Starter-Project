import { Model } from 'mongoose';
import { BaseRepository } from '../../base/baseRepository';
import { IUser } from '@/data/types';

export default class UserRepository extends BaseRepository<IUser> {
  constructor(private readonly userModel: Model<IUser>) {
    super(userModel);
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email }).select('+password').exec();
  }

  // Add specific methods or overrides as needed
}
