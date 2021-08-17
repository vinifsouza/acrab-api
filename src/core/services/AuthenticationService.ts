import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { ACRAB_API_SECRET } from '../../config';
import Exception from '../exceptions/Exception';
import AuthenticationRepository from '../repositories/AuthenticationRepository';

class AuthenticationService {
  async login(reqLogin: string, reqPassword: string): Promise<string> {
    const loginFromDb = await AuthenticationRepository.getUser(reqLogin, reqPassword);

    if (!loginFromDb) {
      throw new Exception(401, 'Invalid credentials');
    }

    const { login, password, secret } = loginFromDb;

    return jwt.sign({ login, password }, secret, { expiresIn: 300 });
  }

  verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new Exception(401, 'No token provided');
    }

    jwt.verify(token, ACRAB_API_SECRET, (err, decoded) => {
      if (err) {
        throw new Exception(401, 'Invalid token');
      }

      req.userDecoded = decoded;
      next();
    });
  }
}

export default new AuthenticationService();
