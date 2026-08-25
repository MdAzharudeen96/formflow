import { verifyToken } from '../services/authService.js';

export function authenticate(request, _response, next) {
  const authorization = request.get('authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    return next(Object.assign(new Error('Authentication required'), { statusCode: 401 }));
  }

  try {
    request.user = verifyToken(token);
    return next();
  } catch {
    return next(Object.assign(new Error('Invalid or expired token'), { statusCode: 401 }));
  }
}

export function requireAdmin(request, _response, next) {
  if (request.user?.role !== 'admin') {
    return next(Object.assign(new Error('Access denied'), { statusCode: 403 }));
  }

  return next();
}
