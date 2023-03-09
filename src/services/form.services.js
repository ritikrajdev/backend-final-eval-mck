import { NotFoundError } from '../../errors.js';
import db from '../models/index.js';

export async function createForm(name, schema) {
  const form = await db.Form.create({ name, schema });
  return form;
}

// TODO: add number of instances
export async function getForms() {
  const allForms = await db.Form.findAll();
  return allForms;
}

// TODO: update only if no instances
export async function editForm(id, name, schema) {
  const form = await db.Form.findOne({ where: { id } });
  if (!form) {
    throw new NotFoundError('Form not found');
  }
  await form.update({ name, schema });
  return form;
}

export async function deleteForm(id) {
  const form = await db.Form.findOne({ where: { id } });
  if (!form) {
    throw new NotFoundError('Form not found');
  }
  await form.destroy();
}
