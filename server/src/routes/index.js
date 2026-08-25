import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import { createPlaceholderRouter } from './placeholderRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', createPlaceholderRouter('Authentication'));
router.use('/admin/forms', createPlaceholderRouter('Admin form APIs'));
router.use('/admin/submissions', createPlaceholderRouter('Admin submission APIs'));
router.use('/public/forms', createPlaceholderRouter('Public form APIs'));
router.use('/public/submissions', createPlaceholderRouter('Public submission APIs'));

export default router;
