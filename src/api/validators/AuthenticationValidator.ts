import * as Yup from 'yup';

import Exception from '../../core/exceptions/Exception';
import { IValidatorLoginRequest } from '../../core/interfaces/IAuthentication';
import { Request } from 'express';

class AuthenticationValidator {
  public async loginValidate(req: Request): Promise<IValidatorLoginRequest> {
    const schema = Yup.object({
      login: Yup.string()
        .typeError('login is not valid')
        .required('login is required'),
      password: Yup.string()
        .typeError('password is not valid')
        .required('password is required'),
    });

    return schema.validate(req.body, { abortEarly: false }).catch(err => {
      const errors = {};

      err.inner.forEach(error => {
        errors[error.path] = error.message;
      });

      throw new Exception(400, errors);
    });
  }
}

export default new AuthenticationValidator();
