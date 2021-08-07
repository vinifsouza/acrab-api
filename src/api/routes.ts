import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationService from '../core/services/AuthenticationService';
import express from 'express';
import indexController from './controllers/IndexController';

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.get('/', indexController.index);

router.use(AuthenticationService.verifyJWT);

router.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    data: {
      error: 'Not found'
    }
  });
})

export default router;
