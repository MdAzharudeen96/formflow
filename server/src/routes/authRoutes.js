import { Router } from 'express';
import {
  getCurrentUser,
  login,
  logout,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', logout);

export default router;
