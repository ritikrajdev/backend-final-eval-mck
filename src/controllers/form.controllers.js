import * as formServices from '../services/form.services.js';

export async function createForm(req, res, next) {
  try {
    const { name, schema } = req.body;
    const form = await formServices.createForm(name, schema);
    res.status(201).json(form);
  } catch (err) {
    next(err);
  }
}

export async function getForms(req, res, next) {
  try {
    const forms = await formServices.getForms();
    res.status(200).json(forms);
  } catch (err) {
    next(err);
  }
}

export async function editForm(req, res, next) {
  try {
    const { id } = req.params;
    const { name, schema } = req.body;
    const form = await formServices.editForm(id, name, schema);
    res.status(200).json(form);
  } catch (err) {
    next(err);
  }
}

export async function deleteForm(req, res, next) {
  try {
    const { id } = req.params;
    await formServices.deleteForm(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
