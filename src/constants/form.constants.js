import joi from 'joi';

export const formFieldTypeValidationMapping = {
  text: joi.string(),
  number: joi.number(),
  email: joi.string().email(),
};

export const formFieldTypes = Object.keys(formFieldTypeValidationMapping);
