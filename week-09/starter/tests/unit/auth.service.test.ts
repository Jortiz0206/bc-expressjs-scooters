import * as authService from '../../src/services/auth.service';
import { User } from '../../src/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/user.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw an error with invalid email', async () => {
      (User.findOne as jest.Mock).mockReturnValue({ select: jest.fn().mockResolvedValue(null) });

      await expect(authService.login('test@test.com', 'password123')).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error with invalid password', async () => {
      const mockUser = { _id: '123', email: 'test@test.com', password: 'hashedpassword' };
      (User.findOne as jest.Mock).mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('test@test.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should return tokens on successful login', async () => {
      const mockUser = { _id: '123', email: 'test@test.com', password: 'hashedpassword', save: jest.fn() };
      (User.findOne as jest.Mock).mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      const result = await authService.login('test@test.com', 'password123');

      expect(result.accessToken).toBe('mockToken');
      expect(result.refreshToken).toBe('mockToken');
      expect(mockUser.save).toHaveBeenCalled();
    });
  });
});
