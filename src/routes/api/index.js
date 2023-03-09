import { Router } from 'express';
import formRoutes from './form.js';
import formResponseRoutes from './fromResponse.js';

const router = Router();

router.use('/forms', formRoutes);
router.use('/form-responses', formResponseRoutes);

export default router;
