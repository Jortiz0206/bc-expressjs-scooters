import { Request, Response, NextFunction } from 'express';
import * as service from '../services/station.service';
import {
  createStationSchema,
  updateStationSchema,
} from '../schemas/station.schema';
import { objectIdSchema } from '../schemas/scooter.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await service.getAll();
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
    const body = createStationSchema.parse(req.body);
    const item = await service.create(body as Record<string, unknown>);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = objectIdSchema.parse({ id: req.params['id'] });
    const body = updateStationSchema.parse(req.body);
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