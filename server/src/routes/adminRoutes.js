import { Router } from 'express';
import { getAdminAccess } from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { createPlaceholderRouter } from './placeholderRoutes.js';

const router = Router();

router.use(authenticate, requireAdmin);
router.get('/', getAdminAccess);
router.use('/forms', createPlaceholderRouter('Admin form APIs'));
router.use('/submissions', createPlaceholderRouter('Admin submission APIs'));

export default router;
