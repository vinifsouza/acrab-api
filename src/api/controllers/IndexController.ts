import { NextFunction, Request, Response } from 'express';

import { API_VERSION } from '../../config';

class IndexController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json('Acrab API - Version: ', API_VERSION);
    } catch (e) {
      next(e);
    }
  }
}

export default new IndexController();
