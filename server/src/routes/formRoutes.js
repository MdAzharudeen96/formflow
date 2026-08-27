import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import {
  createFormController,
  getFormController,
  getForms,
  updateFormController,
  deleteFormController,
} from '../controllers/formController.js';

const router = Router();

router.use(authenticate, requireAdmin);
router.get('/', getForms);
router.post('/', createFormController);
router.get('/:id', getFormController);
router.put('/:id', updateFormController);
router.delete('/:id', deleteFormController);

export default router;
