import mongoose from 'mongoose';

import { IUser } from '../types/interfaces/user.interface';

import { Models, UserRole, UserStatus } from '@/data/types';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    required: true,
    default: UserStatus.ACTIVE,
  },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
});

export const User = mongoose.model<IUser>(Models.User, userSchema, Models.User);
