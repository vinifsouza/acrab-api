import { NextFunction, Request, Response } from 'express';

import AuthenticationValidator from '../validators/AuthenticationValidator';
import Controller from './Controller';

class AuthenticationController extends Controller {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthenticationValidator.loginValidate(req);

      super.response(res, data)
    } catch (err) {
        next(err);
    }
  }
}

export default new AuthenticationController();
