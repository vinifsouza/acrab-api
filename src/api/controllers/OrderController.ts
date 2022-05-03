import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';

import orderListMock from '../../__mocks__/ORDER_LIST.json';
import orderRetrieveMock from '../../__mocks__/ORDER_RETRIEVE.json';
import { STATUS_CODE } from '../../core/constants/controller';
import { EMAIL_WITHOUT_ORDERS } from '../../core/constants/order';

class OrderController extends Controller {
  async orderList(req: Request, res: Response, next: NextFunction) {
    try {
      const { fiscalCode } = req.query;

      if (fiscalCode && fiscalCode === EMAIL_WITHOUT_ORDERS) {
        return res.status(STATUS_CODE.NO_CONTENT).json({});
      }

      return res.status(STATUS_CODE.OK).json(orderListMock);
    } catch (err) {
      next(err);
    }
  }

  async orderRetrive(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.query;

      const order = orderRetrieveMock.filter(order => order.numeroPedido === orderId).shift();

      const status = order ? STATUS_CODE.OK : STATUS_CODE.NO_CONTENT;

      return res.status(status).json(order || {});
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();
