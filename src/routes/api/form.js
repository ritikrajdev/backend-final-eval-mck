import { Router } from 'express';

import * as formController from '../../controllers/form.controllers.js';
import { handleAuth } from '../../middlewares/authHandler.js';
import { generateValidationMiddleware } from '../../middlewares/schemaValidator.js';
import { formSchema } from '../../schemas/form.schema.js';

const router = Router();

router.use(handleAuth);

router.get('', formController.getForms);

router.post(
  '',
  generateValidationMiddleware(formSchema),
  formController.createForm
);

router.put(
  '/:id',
  generateValidationMiddleware(formSchema),
  formController.editForm
);

router.delete('/:id', formController.deleteForm);

export default router;
