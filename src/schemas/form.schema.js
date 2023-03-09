import joi from 'joi';
import { formFieldTypes } from '../constants/form.constants.js';

export const formSchema = joi.object({
  name: joi.string().min(1).max(255).required(),
  schema: joi
    .object()
    .pattern(/^/, joi.string().valid(...formFieldTypes))
    .required(),
});
