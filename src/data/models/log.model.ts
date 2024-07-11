import { model, Schema } from 'mongoose';
import { ILog, Models } from '../types';

const LogSchema = new Schema<ILog>(
  {
    timestamp: { type: Date, default: Date.now },
    level: { type: String, required: true },
    message: { type: String, required: true },
    context: { type: String, default: 'Application' },
  },
  {
    timestamps: true,
  },
);

export default model<ILog>(Models.Log, LogSchema, Models.Log);
