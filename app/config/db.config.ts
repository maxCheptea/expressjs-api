import { Dialect } from "sequelize";

interface IDbConfig {
  host: string;
  username: string;
  password: string | null;
  database: string;
  dialect: Dialect;
}

interface IKeyValue {
  [key: string]: IDbConfig;
}

interface ISequelizeConfig {
  development: IDbConfig;
  test: IDbConfig;
  production: IDbConfig;
  [propName: string]: IDbConfig;
}

export const config: ISequelizeConfig = {
  "development": {
    username: "postgres",
    password: "123",
    database: "postgres",
    host: "localhost",
    dialect: "postgres"
  },
  "test": {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  "production": {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}