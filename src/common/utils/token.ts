import { config } from 'config/config';
import jwt from 'jsonwebtoken';

interface GenerateTokenPayload {
  id: string;
}
export const generateToken = (payload: GenerateTokenPayload): string => {
  const createdAt = Date.now();
  return jwt.sign({ ...payload, createdAt }, config.JWT_SECRET!, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

interface VerifyTokenPayload extends GenerateTokenPayload {
  createdAt: number;
}

export const verifyToken = (token: string): VerifyTokenPayload => {
  return <VerifyTokenPayload>jwt.verify(token, config.JWT_SECRET!);
};
