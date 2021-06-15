import express from 'express';
import cors from 'cors';
import env from './config/env';

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

import userRoutes from './api/routes/user/userApi';
import authRoutes from './api/routes/auth/authApi';
import db  from "./models/index";
import HttpStatusCode from './utils/enums/HttpCodeStatuses';

const gbs = express();
gbs.disable("x-powered-by");

db.init();

var corsOptions = {
  origin: `http://localhost:${env.port}`,
};

gbs.use(cors(corsOptions));
gbs.use(express.json());
gbs.use(express.urlencoded({ extended: true }));

gbs.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
gbs.use('/api', authRoutes);
gbs.use('/api/user', userRoutes);

gbs.use(function (req, res, next) {
  res.status(HttpStatusCode.NOT_FOUND).json({ message: '404 - Not found!' });
});

gbs.listen(env.port, () => console.log(`Example app listening at http://localhost:${env.port}`));
