import { User } from '@/models';
import { IUser, MessageType } from '@/types';
import { NotFoundError } from '@/errors';

export const userService = {
  createUser: async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
  },

  getUsers: async () => {
    return await User.find();
  },

  getUser: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return user;
  },

  updateUser: async (userId: string, userData: IUser) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return updatedUser;
  },

  deleteUser: async (userId: string) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundError([
        { message_en: 'User not found', type: MessageType.ERROR },
      ]);
    }
    return deletedUser;
  },
};
