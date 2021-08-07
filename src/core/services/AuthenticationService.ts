import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { API_SECRET } from '../../config';
import Exception from '../exceptions/Exception';

class AuthenticationService {
  public login(login: string, password: string): Promise<any> {
    const token = jwt.sign({ login, password }, API_SECRET, { expiresIn: 300 });
    return token;
  }

  verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new Exception(401, 'No token provided');
    }

    jwt.verify(token, API_SECRET, (err, decoded) => {
      if (err) {
        throw new Exception(401, 'Invalid token');
      }

      req.userDecoded = decoded;
      next();
    });
  }
}

export default new AuthenticationService();
