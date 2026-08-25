import { Router } from 'express';
import {
  createSubmission,
  getSubmissionController,
  submitSubmissionController,
} from '../controllers/submissionController.js';

const router = Router();

router.post('/', createSubmission);
router.get('/:id', getSubmissionController);
router.post('/:id/submit', submitSubmissionController);

export default router;
