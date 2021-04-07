import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import User from "../User/User";
import UserRole from "./UserRole";

export interface IUserRolesAttributes {
  user_id: string;
  role_id: string;
}

class UserRolesAssoc extends Model<IUserRolesAttributes> implements IUserRolesAttributes {
  user_id: string;
  role_id: string;
}

export const userRolesAssocInit = (sequelize: Sequelize) => {
  UserRolesAssoc.init(
    {
      role_id: {
        type: DataTypes.UUID,
        references: {
          model: UserRole,
          key: "id"
        }
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: User,
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
  User.belongsToMany(UserRole, { through: UserRolesAssoc, as: 'roles', foreignKey: 'user_id' });
  UserRole.belongsToMany(User, { through: UserRolesAssoc, as: 'users', foreignKey: 'role_id' });
}

export default UserRolesAssoc;