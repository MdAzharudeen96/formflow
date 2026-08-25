export function validateRequest(validate) {
  return (request, _response, next) => {
    const error = validate(request);

    if (error) {
      return next(error);
    }

    return next();
  };
}
