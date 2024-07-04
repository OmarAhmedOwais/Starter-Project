import { IConfig } from '@/types';
import { validateEnv } from '@/common/utils';
import dotenv from "dotenv";
import path from "path";
// Determine the environment from the npm script name
const envFile = `.env.${process.env.NODE_ENV}`;
// Load the environment variables from the file
dotenv.config({ path: path.join(__dirname, `../${envFile}`) });
const { error, value } = validateEnv(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const config: IConfig = value;
