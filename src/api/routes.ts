import AuthenticationController from './controllers/AuthenticationController';
import express from 'express';
import indexController from './controllers/IndexController';

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.get('/', indexController.index);

router.use(AuthenticationController.verify);

router.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    data: {
      error: 'Not found',
    },
  });
});

export default router;
