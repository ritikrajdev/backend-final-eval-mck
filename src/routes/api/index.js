import { Router } from 'express';
import formRoutes from './form.js';

const router = Router();

router.use('/forms', formRoutes);

export default router;
