import { User } from '@/data/models';
import AuthRepository from '../modules/authentication/repositories/auth.repository';
import UserRepository from '../modules/user/repositories/userRepository';

class RepositoryFactory {
  static createUserRepository() {
    return new UserRepository(User);
  }

  static createAuthRepository() {
    return new AuthRepository(User);
  }

  // Add methods for other repositories as needed
}

export default RepositoryFactory;
