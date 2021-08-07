import { API_PORT } from '../config';
import apiRouter from './routes';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/', apiRouter);

app.listen(5000, () => {
  console.log('Abrab API - Server Started on Port ', API_PORT, '🔥');
});
