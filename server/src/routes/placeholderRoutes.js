import { Router } from 'express';
import { notImplemented } from '../controllers/notImplementedController.js';

export function createPlaceholderRouter(feature) {
  const router = Router();

  router.get('/', notImplemented(feature));

  return router;
}
