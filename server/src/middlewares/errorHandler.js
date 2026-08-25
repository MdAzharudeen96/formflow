import { sendError } from '../utils/apiResponse.js';

export function notFoundHandler(_request, response) {
  return sendError(response, 404, 'API route not found');
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);

  const statusCode = error.statusCode ?? 500;
  const message = statusCode >= 500 ? 'Something went wrong' : error.message;

  return sendError(response, statusCode, message);
}
