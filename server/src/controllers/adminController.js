import { sendSuccess } from '../utils/apiResponse.js';

export function getAdminAccess(_request, response) {
  return sendSuccess(response, 'Admin access granted');
}
