import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import authRoutes from './authRoutes.js';
import formRoutes from './formRoutes.js';
import healthRoutes from './healthRoutes.js';
import publicFormRoutes from './publicFormRoutes.js';
import submissionRoutes from './submissionRoutes.js';
import { createPlaceholderRouter } from './placeholderRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/forms', formRoutes);
router.use('/admin', adminRoutes);
router.use('/public/forms', publicFormRoutes);
router.use('/public/submissions', createPlaceholderRouter('Public submission APIs'));
router.use('/submissions', submissionRoutes);

export default router;
