import { HttpError, NotFoundError } from '../../errors.js';
import db from '../models/index.js';

export async function createForm(name, schema) {
  const form = await db.Form.create({ name, schema });
  return form;
}

export async function getForms() {
  const allForms = await db.Form.findAll({
    include: {
      model: db.FormResponse,
      as: 'formResponses',
    },
  });

  return allForms;
}

// TODO: update schema only if no instances
export async function editForm(id, name, schema) {
  const form = await db.Form.findOne({
    where: { id },
    include: {
      model: db.FormResponse,
      as: 'formResponses',
    },
  });

  if (!form) {
    throw new NotFoundError('Form not found');
  }

  if (
    form.formResponses.length > 0 &&
    JSON.stringify(schema) !== JSON.stringify(form.schema)
  ) {
    throw new HttpError('Cannot update schema of form with responses', 400);
  }

  await form.update({ name, schema });
  delete form.dataValues.formResponses;
  return form;
}

export async function deleteForm(id) {
  const form = await db.Form.findOne({ where: { id } });
  if (!form) {
    throw new NotFoundError('Form not found');
  }
  await form.destroy();
}
