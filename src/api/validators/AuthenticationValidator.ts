import * as Yup from 'yup';

import Exception from '../../core/exceptions/Exception';
import { ILoginRequest } from '../../core/interfaces/validators/AuthenticationValidator';
import { Request } from 'express';

class AuthenticationValidator {
  public async loginValidate(req: Request): Promise<ILoginRequest> {
    const schema = Yup.object({
      login: Yup.string()
        .typeError('login is not valid')
        .required('login is required'),
      password: Yup.string()
        .typeError('password is not valid')
        .required('password is required'),
    });

    return await schema.validate(req.body, { abortEarly: false }).catch(err => {
      const errors = {};

      err.inner.forEach(error => {
        errors[error.path] = error.message;
      });

      throw new Exception(400, errors);
    });
  }
}

export default new AuthenticationValidator();
