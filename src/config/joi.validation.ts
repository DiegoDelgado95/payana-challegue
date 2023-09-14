/* eslint-disable prettier/prettier */
import * as Joi from 'joi';

export const JoiValidtionSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_NAME: Joi.string().default('payanadb'),
  DB_USER: Joi.string().default('payana_user'),
  DB_PASSWORD: Joi.string().default('secret-payana'),
});
