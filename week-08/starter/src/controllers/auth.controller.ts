import { Request, Response, NextFunction } from 'express';
import * as service from '../services/auth.service';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { AuthRequest } from '../middlewares/auth.middleware';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = registerSchema.parse(req);
    const { user, accessToken, refreshToken } = await service.register(body);
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({ data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'User already exists') {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = loginSchema.parse(req);
    const { user, accessToken, refreshToken } = await service.login(body.email, body.password);
    setCookies(res, accessToken, refreshToken);
    res.json({ data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Invalid credentials') {
      res.status(401).json({ error: err.message });
      return;
    }
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ error: 'No refresh token' });
      return;
    }
    const tokens = await service.refresh(refreshToken);
    setCookies(res, tokens.accessToken, tokens.refreshToken);
    res.json({ data: { message: 'Tokens refreshed successfully' } });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ data: { message: 'Logged out successfully' } });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json({ data: { user: req.user } });
};
