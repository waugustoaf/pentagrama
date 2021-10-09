import 'reflect-metadata';
import '@shared/container';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errors } from './middlewares/errors';
import { createConnection } from '../typeorm';
import { errors as celebrateErrors } from 'celebrate';

// Criação automática de migrations para descartar a necessidade do avaliador utilizar CLI
createConnection().then((connection) => connection.runMigrations());

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(celebrateErrors());

app.use(errors);

app.listen(3333, () => {
  console.log('🔥 The server has started.');
});
