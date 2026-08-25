import { getFeatureStatus } from '../services/featureStatusService.js';
import { sendError } from '../utils/apiResponse.js';

export function notImplemented(feature) {
  return (_request, response) => {
    sendError(response, 501, getFeatureStatus(feature));
  };
}
