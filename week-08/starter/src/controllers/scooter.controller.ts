import { Request, Response, NextFunction } from 'express';
import * as service from '../services/scooter.service';
import {
  createScooterSchema,
  updateScooterSchema,
  objectIdSchema,
} from '../schemas/scooter.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page'] ?? 1);
    const limit = Number(req.query['limit'] ?? 10);
    const search = req.query['search'] as string | undefined;
    const items = await service.getAll(page, limit, search);
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = objectIdSchema.parse({ id: req.params['id'] });
    const item = await service.getById(id);
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createScooterSchema.parse(req.body);
    const item = await service.create(body as Record<string, unknown>);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = objectIdSchema.parse({ id: req.params['id'] });
    const body = updateScooterSchema.parse(req.body);
    const item = await service.update(id, body as Record<string, unknown>);
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = objectIdSchema.parse({ id: req.params['id'] });
    await service.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}