import config from "../config/db.config";
import { Sequelize } from "sequelize";
import env from "../config/env";
import { userInit } from "./User/User";
import { roleInit } from "./Privileges/Role";

interface IDb {
  sequelize: Sequelize;
  Sequelize: any;
  init(): void;
}

const envConfig = config[env.nodeEnv];

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  host: envConfig.host,
  dialect: envConfig.dialect,
});

const init = () => {
  userInit(sequelize);
  roleInit(sequelize);
}

const db: IDb = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  init
};

export default db;
