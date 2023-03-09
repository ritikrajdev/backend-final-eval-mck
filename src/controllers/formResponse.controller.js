import * as formResponseServices from '../services/formResponses.services.js';

export async function createFormResponse(req, res, next) {
  const { form_id, response } = req.body;
  try {
    const formResponse = await formResponseServices.createFormResponse(
      form_id,
      response
    );
    res.status(201).json(formResponse);
  } catch (err) {
    next(err);
  }
}

export async function getFormResponses(req, res, next) {
  try {
    const formResponses = await formResponseServices.getFormResponses();
    res.status(200).json(formResponses);
  } catch (err) {
    next(err);
  }
}

export async function editFormResponse(req, res, next) {
  const { id } = req.params;
  const { form_id, response } = req.body;
  try {
    const formResponse = await formResponseServices.editFormResponse(
      id,
      form_id,
      response
    );
    res.status(200).json(formResponse);
  } catch (err) {
    next(err);
  }
}

export async function deleteFormResponse(req, res, next) {
  const { id } = req.params;
  try {
    await formResponseServices.deleteFormResponse(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
