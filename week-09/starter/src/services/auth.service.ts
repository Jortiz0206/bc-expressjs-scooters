import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || 'refresh_secret', { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const register = async (data: any) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  
  const { accessToken, refreshToken } = generateTokens(user._id as string);
  user.refreshToken = refreshToken;
  await user.save();
  
  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password!);
  if (!isMatch) throw new Error('Invalid credentials');

  const { accessToken, refreshToken } = generateTokens(user._id as string);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const refresh = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as { id: string };
  const user = await User.findById(decoded.id);
  
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  const tokens = generateTokens(user._id as string);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};
