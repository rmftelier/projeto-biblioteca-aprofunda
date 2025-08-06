import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default';

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1hr' });
};

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}