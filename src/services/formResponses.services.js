import { HttpError } from '../../errors.js';
import db from '../models/index.js';
import { createJoiSchema } from '../utils/schema.js';

export async function createFormResponse(form_id, response) {
  const form = await db.Form.findByPk(form_id);
  if (!form) {
    throw new HttpError('Form not found', 400);
  }

  const formSchema = createJoiSchema(form.schema);
  await formSchema.validateAsync(response);
  const formResponse = await db.FormResponse.create({ form_id, response });
  return formResponse;
}

export async function getFormResponses(form_id = undefined) {
  if (!form_id) return await db.FormResponse.findAll();

  const formResponses = await db.FormResponse.findAll({ where: { form_id } });
  return formResponses;
}

export async function editFormResponse(id, form_id, response) {
  const form = await db.Form.findByPk(form_id);
  if (!form) {
    throw new HttpError('Form not found', 400);
  }

  const formSchema = createJoiSchema(form.schema);
  await formSchema.validateAsync(response);

  const formResponse = await db.FormResponse.findByPk(id);
  if (!formResponse) {
    throw new HttpError('Form response not found', 404);
  }

  await formResponse.update({ form_id, response });
  return formResponse;
}

export async function deleteFormResponse(id) {
  const formResponse = await db.FormResponse.findByPk(id);
  if (!formResponse) {
    throw new HttpError('Form response not found', 404);
  }

  await formResponse.destroy();
}
