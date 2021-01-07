import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from './config/env';

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

import userRoutes from './api/routes/user/user';
import authRoutes from './api/routes/auth/auth';
import db  from "./models/index";

const gbs = express();
gbs.disable("x-powered-by");

db.init();

var corsOptions = {
  origin: `http://localhost:${env.port}`,
};

gbs.use(cors(corsOptions));
gbs.use(bodyParser.json());
gbs.use(bodyParser.urlencoded({ extended: true }));

gbs.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
gbs.use('/api', authRoutes);
gbs.use('/api/user', userRoutes);

gbs.listen(env.port, () => console.log(`Example app listening at http://localhost:${env.port}`));
