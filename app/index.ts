import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from './config/env';

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

import userRoutes from './api/routes/user/user';
import middlewares from './api/middleware';

import db  from "./models/index";
// db.sequelize.sync();
db.init();

const app = express();

var corsOptions = {
  origin: `http://localhost:${env.port}`
};


app.use(middlewares.attachCurrentUser);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', userRoutes);

app.get('/', (req, res) => res.json({ message: 'Hello World!'}));

app.listen(env.port, () => console.log(`Example app listening at http://localhost:${env.port}`));