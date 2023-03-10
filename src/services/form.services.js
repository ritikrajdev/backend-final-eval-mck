import isJsonEqual from 'lodash.isequal';
import { HttpError, NotFoundError } from '../../errors.js';
import db from '../models/index.js';

export async function createForm(name, schema, userId) {
  const form = await db.Form.create({ name, schema, userId });
  return form;
}

export async function getForms(userId) {
  const allForms = await db.Form.findAll({
    where: { userId },
    include: {
      model: db.FormResponse,
      as: 'formResponses',
    },
  });

  return allForms;
}

export async function editForm(id, name, schema, userId) {
  const form = await db.Form.findOne({
    where: { id, userId },
    include: {
      model: db.FormResponse,
      as: 'formResponses',
    },
  });

  if (!form) {
    throw new NotFoundError('Form not found');
  }

  if (form.formResponses.length > 0 && !isJsonEqual(schema, form.schema)) {
    // check if only one new key is added to schema or only one is removed then update schema and also the response from FormResponse
    // else throw error

    const numKeysInSchema = Object.keys(schema).length;
    const numKeysInFormSchema = Object.keys(form.schema).length;

    if (numKeysInSchema === numKeysInFormSchema + 1) {
      const newKeys = Object.keys(schema).filter(
        (key) => !Object.keys(form.schema).includes(key)
      );

      if (newKeys.length !== 1)
        throw new HttpError('Cannot update schema of form with responses', 400);

      const newKey = newKeys[0];

      if (!isJsonEqual({ ...form.schema, [newKey]: schema[newKey] }, schema)) {
        throw new HttpError('Cannot update schema of form with responses', 400);
      }

      form.schema = { ...form.schema, [newKey]: schema[newKey] };
      await Promise.all(
        form.formResponses.map(async (res) => {
          res.response = { ...res.response, [newKey]: '' };
          return await res.save();
        })
      );
      return await form.save();
    } else if (numKeysInSchema === numKeysInFormSchema - 1) {
      const deletedKeys = Object.keys(form.schema).filter(
        (key) => !Object.keys(schema).includes(key)
      );

      if (deletedKeys.length !== 1)
        throw new HttpError('Cannot update schema of form with responses', 400);

      const deletedKey = deletedKeys[0];

      if (
        !isJsonEqual(
          { ...schema, [deletedKey]: form.schema[deletedKey] },
          form.schema
        )
      ) {
        throw new HttpError('Cannot update schema of form with responses', 400);
      }

      form.schema = { ...schema };
      await Promise.all(
        form.formResponses.map(async (res) => {
          delete res.response[deletedKey];
          return await res.save();
        })
      );
      return await form.save();
    }

    throw new HttpError('Cannot update schema of form with responses', 400);
  }

  await form.update({ name, schema });
  delete form.dataValues.formResponses;
  return form;
}

export async function deleteForm(id, userId) {
  const form = await db.Form.findOne({ where: { id, userId } });
  if (!form) {
    throw new NotFoundError('Form not found');
  }
  await form.destroy();
}
