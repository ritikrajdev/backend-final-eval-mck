import Joi from 'joi';
import { formFieldTypeValidationMapping } from '../constants/form.constants.js';

export function createJoiSchema(schema) {
  const joiSchemaObject = {};

  Object.entries(schema).forEach(([field, type]) => {
    joiSchemaObject[field] = formFieldTypeValidationMapping[type];
  });

  return Joi.object(joiSchemaObject);
}
