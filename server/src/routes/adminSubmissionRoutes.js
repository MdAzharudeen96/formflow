import { Router } from 'express';
import {
  getAdminSubmissionsController,
  getAdminSubmissionController,
  approveSubmissionController,
  rejectSubmissionController,
} from '../controllers/submissionController.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/', getAdminSubmissionsController);
router.get('/:id', getAdminSubmissionController);
router.put('/:id/approve', approveSubmissionController);
router.put('/:id/reject', rejectSubmissionController);

export default router;