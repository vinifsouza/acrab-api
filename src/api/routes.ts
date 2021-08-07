import AuthenticationController from './controllers/AuthenticationController';
import express from 'express';
import indexController from './controllers/IndexController';

const router = express.Router();

router.get('/', indexController.index);

router.post('/login', AuthenticationController.login);

router.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    data: {
      error: 'Not found'
    }
  });
})

export default router;
