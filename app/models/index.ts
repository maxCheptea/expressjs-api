import config from "../config/db.config";
import { Sequelize } from "sequelize";
import env from "../config/env";
import { userInit } from "./User/User";
import { userRoleInit } from "./Privileges/UserRole";
import { tokenBlacklistInit } from "./Auth/TokenBlacklist";
import { userRolesAssocInit } from "./Privileges/UserRolesAssoc";

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
  tokenBlacklistInit(sequelize);
  userInit(sequelize);
  userRoleInit(sequelize);
  userRolesAssocInit(sequelize);
}

const db: IDb = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  init
};

export default db;
