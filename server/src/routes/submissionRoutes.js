import { Router } from 'express';
import {
  getPublicFormController,
  createSubmission,
  getSubmissionController,
  submitSubmissionController,
  getAdminSubmissionsController,
  getAdminSubmissionController,
  approveSubmissionController,
  rejectSubmissionController,
} from '../controllers/submissionController.js';

const router = Router();

router.post('/', createSubmission);
router.get('/:id', getSubmissionController);
router.post('/:id/submit', submitSubmissionController);

export default router;
