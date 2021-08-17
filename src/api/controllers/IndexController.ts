import { NextFunction, Request, Response } from 'express';

import { ACRAB_API_VERSION } from '../../config';
import Controller from './Controller';

class IndexController extends Controller {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        name: `Acrab API`,
        version: ACRAB_API_VERSION,
        author: 'Vinícius Souza',
        description: '',
        repository: 'https://github.com/vinifsouza/acrab-api'
      };
      super.response(res, data);
    } catch (err) {
      next(err);
    }
  }
}

export default new IndexController();
