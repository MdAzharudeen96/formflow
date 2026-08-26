import { Router } from 'express';
import {
  getPublicFormController,
  createSubmission,
  getSubmissionController,
  updateSubmissionController,
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
router.put('/:id', updateSubmissionController);

export default router;
