import express from 'express';

import IndexController from './controllers/IndexController';
import OrderController from './controllers/OrderController';
import Exception from '../core/exceptions/Exception';

import { STATUS_CODE } from '../core/constants/controller';

const router = express.Router();

router.get('/', IndexController.index);
router.get('/api/Orders/list', OrderController.orderList);
router.get('/api/Orders/retrieve', OrderController.orderRetrive);

router.all('*', () => {
  throw new Exception(STATUS_CODE.NOT_FOUND, 'Page not found');
});

export default router;
