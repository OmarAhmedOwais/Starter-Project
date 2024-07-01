import { User } from '@/models';
import { IUser, MessageType } from '@/types';
import { NotFoundError } from '@/errors';

export class UserService {
  async createUser(userData: IUser) {
    const user = new User(userData);
    return await user.save();
  }

  async getUsers() {
    return await User.find();
  }

  async getUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return user;
  }

  async updateUser(userId: string, userData: IUser) {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!updatedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return deletedUser;
  }
}
