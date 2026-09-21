import request from 'supertest';
import app from '../../src/app';
import { connectDB, clearDB, closeDB } from './setup';

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Auth Integration Tests', () => {
  const registerPayload = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'CLIENTE',
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app).post('/api/v1/auth/register').send(registerPayload);
      expect(res.status).toBe(201);
      expect(res.body.data.user.email).toBe(registerPayload.email);
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({ ...registerPayload, email: 'invalid' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/v1/auth/register').send(registerPayload);
    });

    it('should login successfully with valid credentials', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: registerPayload.email,
        password: registerPayload.password,
      });
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: registerPayload.email,
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
    });
  });
});
