import * as bcrypt from 'bcrypt';
import { config } from 'config/config';

export class Password {
  static hash(plainText: string): string {
    const salt = bcrypt.genSaltSync(Number(config.BCRYPT_SALT));
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
