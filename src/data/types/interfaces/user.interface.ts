import { UserRole, UserStatus } from '@/data/types';

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  status?: UserStatus;
  [key: string]: any;
}

export interface registerBody {
  name: string;
  password: string;
  phone: string;
  role: UserRole;
}
