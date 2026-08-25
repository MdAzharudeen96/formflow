import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const passwordRounds = 10;

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    const error = new Error('JWT_SECRET is not configured');
    error.statusCode = 500;
    throw error;
  }

  return process.env.JWT_SECRET;
}

export function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function authenticateUser(email, password) {
  const user = await User.findOne({ email }).select('+passwordHash');

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null;
  }

  return user;
}

export async function findUserById(userId) {
  return User.findById(userId);
}

export function createToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    getJwtSecret(),
    { expiresIn: '1d' },
  );
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}

export function hashPassword(password) {
  return bcrypt.hash(password, passwordRounds);
}
