import { Router } from 'express';
import * as store from '../store.js';
import type { CreateItemDto, UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /items — Listar todos los recursos de patinetas
itemsRouter.get('/', (_req, res) => {
  const scooters = store.getAll();
  res.status(200).json(scooters);
});

// GET /items/:id — Obtener patineta por ID
itemsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido. Debe ser un número.' });
    return;
  }

  const scooter = store.getById(id);
  if (!scooter) {
    res.status(404).json({ error: 'Patineta no encontrada' });
    return;
  }

  res.status(200).json(scooter);
});

// POST /items — Crear nueva patineta
itemsRouter.post('/', (req, res) => {
  const body = req.body as CreateItemDto;

  // Validación básica de campos requeridos
  if (!body.name || !body.category || typeof body.price !== 'number' || typeof body.stock !== 'number') {
    res.status(400).json({ error: 'Faltan campos obligatorios o tienen formato incorrecto (name, category, price, stock, active)' });
    return;
  }

  const newScooter = store.create(body);
  res.status(201).json(newScooter);
});

// PUT /items/:id — Actualizar patineta por ID
itemsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido. Debe ser un número.' });
    return;
  }

  const body = req.body as UpdateItemDto;
  const updatedScooter = store.update(id, body);

  if (!updatedScooter) {
    res.status(404).json({ error: 'Patineta no encontrada para actualizar' });
    return;
  }

  res.status(200).json(updatedScooter);
});

// DELETE /items/:id — Eliminar patineta
itemsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido. Debe ser un número.' });
    return;
  }

  const success = store.remove(id);
  if (!success) {
    res.status(404).json({ error: 'Patineta no encontrada para eliminar' });
    return;
  }

  res.status(204).send();
});