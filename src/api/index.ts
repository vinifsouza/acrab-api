/* eslint-disable no-console */
import { ACRAB_API_PORT } from '../config';
import apiRouter from './routes';
import express from 'express';
import handleErrors from './middleware/handleErrors';

const app = express();

app.use(express.json());

app.use('/', apiRouter);

app.use(handleErrors);

app.listen(ACRAB_API_PORT, () => {
  console.log('Acrab API - Server Started on Port ', ACRAB_API_PORT, '🔥');
});
