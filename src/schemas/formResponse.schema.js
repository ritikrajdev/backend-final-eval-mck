import joi from 'joi';

export const formResponseSchema = joi.object({
  form_id: joi.number().min(1).required(),
  response: joi.object().required(),
});
