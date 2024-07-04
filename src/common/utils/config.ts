import { envVarsSchema } from "@/common/validation";
import { IConfig } from "@/types";
import Joi from "joi";

export const validateEnv = (obj: object): { error: Joi.ValidationError | undefined, value: IConfig } => {
  const { error, value } = envVarsSchema
    .prefs({ errors: { label: 'key' }, stripUnknown: true })
    .validate(obj);
  
  // Manually create an object with only the matched schema values
  const matchedValues: Partial<IConfig> = {};
  for (const key in envVarsSchema.describe().keys) {
    if (value[key] !== undefined) {
      matchedValues[key as keyof IConfig] = value[key];
    }
  }
  
  return { error, value: matchedValues as IConfig };
};
