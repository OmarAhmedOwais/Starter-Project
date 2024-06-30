import { IConfig } from '@/types';
import { validateEnv } from '@/utils';
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });
const { error, value } = validateEnv(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const config: IConfig = value;
