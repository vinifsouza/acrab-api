import { NextFunction, Request, Response } from 'express';

import AuthenticationService from '../../core/services/AuthenticationService';
import AuthenticationValidator from '../validators/AuthenticationValidator';
import Controller from './Controller';

class AuthenticationController extends Controller {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = await AuthenticationValidator.loginValidate(req);

      const token = await AuthenticationService.login(login, password);

      super.response(res, { token });
    } catch (err) {
      next(err);
    }
  }

  verify(req: Request, res: Response, next: NextFunction) {
    try {
      AuthenticationService.verifyJWT(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthenticationController();
