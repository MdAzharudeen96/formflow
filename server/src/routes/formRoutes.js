import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import {
  createFormController,
  getFormController,
  getForms,
  updateFormController,
} from '../controllers/formController.js';

const router = Router();

router.use(authenticate, requireAdmin);
router.get('/', getForms);
router.post('/', createFormController);
router.get('/:id', getFormController);
router.put('/:id', updateFormController);

export default router;
