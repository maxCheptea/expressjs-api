import dotenv from 'dotenv';

dotenv.config();

interface IEnvironment{
  nodeEnv: string;
  tokenSecret: string;
  port: string;
}

const env: IEnvironment = {
  nodeEnv: process.env.ENV,
  tokenSecret: process.env.TOKEN_SECRET,
  port: process.env.PORT,
};

export default env;