import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import IBaseModel from "../IBaseModel";

interface IUserPermissionsAttributes extends IBaseModel {
  name: string;
}

class UserPermissionModel extends Model<IUserPermissionsAttributes> implements IUserPermissionsAttributes {
  id?: string;
  name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userPermissionsInit = (sequelize: Sequelize) => {
  UserPermissionModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "user_permissions",
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
}

export default UserPermissionModel;
