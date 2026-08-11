import { Router } from 'express';
import * as controller from '../controllers/scooters.controller';

export const scootersRouter = Router();

scootersRouter.get('/', controller.getAll);
scootersRouter.get('/:id', controller.getById);
scootersRouter.post('/', controller.create);
scootersRouter.put('/:id', controller.update);
scootersRouter.delete('/:id', controller.remove);