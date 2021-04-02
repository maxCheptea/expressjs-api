import { Dialect } from "sequelize";
import config from "./config.json";

interface IDbConfig {
  host: string;
  username: string;
  password: string | null;
  database: string;
  dialect: Dialect;
}

interface ISequelizeConfig {
  development: IDbConfig;
  test: IDbConfig;
  production: IDbConfig;
  [propName: string]: IDbConfig;
}

export default config as ISequelizeConfig;
