import { Router } from 'express';
import * as controller from '../controllers/scooter.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, requireRole('ADMIN'), controller.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'TECNICO'), controller.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), controller.remove);

export default router;
