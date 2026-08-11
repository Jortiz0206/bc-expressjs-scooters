import { Request, Response, NextFunction } from 'express';
import * as service from '../services/scooters.service';
import { CreateScooterDto, UpdateScooterDto } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const scooter = await service.findById(id);

    if (!scooter) {
      res.status(404).json({ 
        error: 'Not Found', 
        message: `Scooter con id ${id} no encontrada` 
      });
      return;
    }

    res.json({ data: scooter });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto: CreateScooterDto = req.body;
    const scooter = await service.create(dto);
    res.status(201).json({ data: scooter });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const dto: UpdateScooterDto = req.body;
    const updated = await service.update(id, dto);
    if (!updated) {
      res.status(404).json({ 
        error: 'Not Found', 
        message: `Scooter con id ${id} no encontrada` 
      });
      return;
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Patineta no encontrada' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}   