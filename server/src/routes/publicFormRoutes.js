import { Router } from 'express';
import { getPublicFormController } from '../controllers/submissionController.js';

const router = Router();

router.get('/:id', getPublicFormController);

export default router;
