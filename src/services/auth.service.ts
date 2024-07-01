
import { Password, generateToken } from '@/utils';
import { MessageType, registerBody } from '@/types';
import { BadRequestError } from '@/errors';
import { User } from '@/models';

export const authService = {
  registerUser: async (userBody: registerBody) => {
    try {
      const newUser = new User(userBody);
      newUser.password = Password.hash(userBody.password);
      await newUser.save();

      const token = generateToken({ id: newUser._id });
      return { newUser, token };
    } catch (error) {
      throw new BadRequestError([
        { message_en: 'Error Registering The User', type: MessageType.ERROR },
      ]);
    }
  },

  login: async (phone: string, password: string) => {
    try {
      const user = await User.findOne({ phone });

      if (!user || !Password.compare(password, user.password)) {
        throw new BadRequestError([
          {
            message_en: 'Invalid Phone Number or Password',
            type: MessageType.ERROR,
          },
        ]);
      }

      const token = generateToken({ id: user._id });
      return { user, token };
    } catch (error) {
      throw new BadRequestError([
        { message_en: 'Invalid Phone Number or Password', type: MessageType.ERROR },
      ]);
    }
  },

  logout: async () => {
    // Add any necessary logic for logout if needed
    return true;
  },
};
