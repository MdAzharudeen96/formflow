import {
  authenticateUser,
  createToken,
  findUserById,
  toPublicUser,
} from '../services/authService.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';

export async function login(request, response) {
  const { email, password } = request.body ?? {};

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return sendError(response, 400, 'Email and password are required');
  }

  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return sendError(response, 400, 'Please provide a valid email address');
  }

  const user = await authenticateUser(email.trim().toLowerCase(), password);

  if (!user || user.role !== 'admin') {
    return sendError(response, 401, 'Invalid email or password');
  }

  return sendSuccess(response, 'Login successful', {
    token: createToken(user),
    user: toPublicUser(user),
  });
}

export async function getCurrentUser(request, response) {
  const user = await findUserById(request.user.userId);

  if (!user || user.role !== 'admin') {
    return sendError(response, 401, 'Invalid or expired token');
  }

  return sendSuccess(response, 'Authenticated user', {
    user: toPublicUser(user),
  });
}

export function logout(_request, response) {
  return sendSuccess(response, 'Logout successful');
}

