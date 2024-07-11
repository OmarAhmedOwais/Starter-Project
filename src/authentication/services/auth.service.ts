import { GenerateTokenPayload, Password, generateToken, logger } from '@/common/utils';
import { MessageType, registerBody } from '@/data/types';
import { BadRequestError } from '@/common/errors';
import RepositoryFactory from '@/factories/repositoryFactory';
import { IUser } from '@/data/types';

const userRepository = RepositoryFactory.createUserRepository();

export class AuthService {
  private static instance: AuthService;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async registerUser(userBody: registerBody) {
    try {
      const hashedPassword = Password.hash(userBody.password);

      // Create the new user
      const newUser = await userRepository.create({ ...userBody, password: hashedPassword } as IUser);

      // Generate a token for the new user
      const token = generateToken({ id: newUser._id?.toString() } as GenerateTokenPayload);

      return { newUser, token };
    } catch (error) {
      // Log the error details for debugging
      logger.error('Error in registerUser:', error);

      throw new BadRequestError([
        { message_en: 'Error Registering The User', type: MessageType.ERROR },
      ]);
    }
  }

  public async login(phone: string, password: string) {
    try {
      const user = await userRepository.findOne({ phone });

      if (!user || !Password.compare(password, user.password)) {
        throw new BadRequestError([
          {
            message_en: 'Invalid Phone Number or Password',
            type: MessageType.ERROR,
          },
        ]);
      }

      const token = generateToken({ id: user._id?.toString() } as GenerateTokenPayload);
      return { user, token };
    } catch (error) {
      throw new BadRequestError([
        { message_en: 'Invalid Phone Number or Password', type: MessageType.ERROR },
      ]);
    }
  }

  public async logout() {
    // Add any necessary logic for logout if needed
    return true;
  }
}
