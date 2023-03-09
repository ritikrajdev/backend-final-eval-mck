import { Router } from 'express';

import * as formResponseController from '../../controllers/formResponse.controller.js';
import { handleAuth } from '../../middlewares/authHandler.js';
import { generateValidationMiddleware } from '../../middlewares/schemaValidator.js';
import { formResponseSchema } from '../../schemas/formResponse.schema.js';

const router = Router();

router.use(handleAuth);

router.get('/', formResponseController.getFormResponses);
router.post(
  '/',
  generateValidationMiddleware(formResponseSchema),
  formResponseController.createFormResponse
);

router.put(
  '/:id',
  generateValidationMiddleware(formResponseSchema),
  formResponseController.editFormResponse
);
router.delete('/:id', formResponseController.deleteFormResponse);

export default router;
