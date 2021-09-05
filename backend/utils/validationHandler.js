import { ValidationError } from 'sequelize';
import { ExtendedValidationError } from '../RequestError';

export default (err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    const errOut = new ExtendedValidationError('Validation Error', err.message);
    errOut.errors = err.errors.map(e => e.message);
    return next(errOut);
  } else return next(err);
};
