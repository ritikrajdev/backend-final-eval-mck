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

export async function getFormResponses(form_id, userId) {
  const whereQuery = form_id ? { id: form_id, userId } : { userId };
  return (
    await db.Form.findAll({
      where: whereQuery,
      include: {
        model: db.FormResponse,
        as: 'formResponses',
      },
    })
  ).formResponses;
}

export async function editFormResponse(id, form_id, response, userId) {
  const form = await db.Form.findByPk(form_id);
  if (!form || form.user_id !== userId) {
    throw new HttpError('no such form exists', 400);
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

export async function deleteFormResponse(id, userId) {
  const formResponse = await db.FormResponse.findByPk(id);
  if (!formResponse) {
    throw new HttpError('Form response not found', 404);
  }

  const form = await formResponse.getForm();
  if (form.user_id !== userId) {
    throw new HttpError('Form Response not found', 404);
  }

  await formResponse.destroy();
}
