import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

// Generates a JWT token for a user
export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email
  };

  const secret = process.env.JWT_SECRET || 'fallback-secret-not-for-production';
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

// Verifies and decodes a JWT token
export const verifyToken = (token: string): { userId: number; email: string } | null => {
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-not-for-production';
    const decoded = jwt.verify(token, secret) as { userId: number; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

// Hashes a password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compares a password with a hashed password
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};