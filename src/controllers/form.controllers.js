import * as formServices from '../services/form.services.js';

export async function createForm(req, res, next) {
  try {
    const { name, schema } = req.body;
    const userId = req.user.id;
    const form = await formServices.createForm(name, schema, userId);
    res.status(201).json(form);
  } catch (err) {
    next(err);
  }
}

export async function getForms(req, res, next) {
  try {
    const userId = req.user.id;
    const forms = await formServices.getForms(userId);
    res.status(200).json(forms);
  } catch (err) {
    next(err);
  }
}

export async function editForm(req, res, next) {
  try {
    const { id } = req.params;
    const { name, schema } = req.body;
    const userId = req.user.id;
    const form = await formServices.editForm(id, name, schema, userId);
    res.status(200).json(form);
  } catch (err) {
    next(err);
  }
}

export async function deleteForm(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await formServices.deleteForm(id, userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
