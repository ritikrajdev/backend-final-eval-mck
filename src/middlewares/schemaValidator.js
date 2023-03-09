export function generateValidationMiddleware(
  joiSchema,
  validateProperty = 'body'
) {
  return async function (req, res, next) {
    try {
      await joiSchema.validateAsync(req[validateProperty]);
      next();
    } catch (err) {
      next(err);
    }
  };
}
