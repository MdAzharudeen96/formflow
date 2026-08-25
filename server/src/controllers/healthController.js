import { sendSuccess } from '../utils/apiResponse.js';

export function getHealth(_request, response) {
  return sendSuccess(response, 'API connection healthy');
}
