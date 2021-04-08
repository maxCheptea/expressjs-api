import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import UserModel from "../User/UserModel";
import UserRoleModel from "./UserRoleModel";

export interface IUserRolesAttributes {
  user_id: string;
  role_id: string;
}

class UserRolesAssocModel extends Model<IUserRolesAttributes> implements IUserRolesAttributes {
  user_id: string;
  role_id: string;
}

export const userRolesAssocInit = (sequelize: Sequelize) => {
  UserRolesAssocModel.init(
    {
      role_id: {
        type: DataTypes.UUID,
        references: {
          model: UserRoleModel,
          key: "id"
        }
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: UserModel,
          key: "id"
        }
      }
    },
    {
      tableName: "user_roles_assoc",
      timestamps: false,
      sequelize, // passing the `sequelize` instance is required
    },
  );
  UserModel.belongsToMany(UserRoleModel, { through: UserRolesAssocModel, as: 'roles', foreignKey: 'user_id' });
  UserRoleModel.belongsToMany(UserModel, { through: UserRolesAssocModel, as: 'users', foreignKey: 'role_id' });
}

export default UserRolesAssocModel;
