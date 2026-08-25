export function sendSuccess(response, message, data) {
  const payload = { success: true, message };

  if (data !== undefined) {
    payload.data = data;
  }

  return response.json(payload);
}

export function sendError(response, statusCode, message) {
  return response.status(statusCode).json({
    success: false,
    message,
  });
}
