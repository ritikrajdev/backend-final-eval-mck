import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { CORS_ORIGIN, PORT } from './config.js';
import { handleAuth } from './src/middlewares/authHandler.js';
import { handleErrors } from './src/middlewares/errorHandler.js';

import routes from './src/routes/index.js';

if (!String(process.env.NODE_ENV).includes('docker')) {
  config();
}

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);
app.use(express.json());

app.use('', routes);

app.get('/', handleAuth, (req, res) => {
  res.send('Hello World!');
});

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
