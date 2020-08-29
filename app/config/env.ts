import dotenv from 'dotenv';

dotenv.config();

interface IEnvironment{
  nodeEnv: string;
  port: string;
  db: object;
}

const env: IEnvironment = {
  nodeEnv: process.env.ENV,
  port: process.env.PORT,
  db: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    dbname: process.env.DB,
    dialect: process.env.DIALECT,
  },
};

export default env;