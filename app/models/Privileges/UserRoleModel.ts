import { Sequelize, Model, DataTypes } from 'sequelize';
import IBaseModel from '../IBaseModel';

export interface IUserRoleAttributes extends IBaseModel {
  name: string;
}

class UserRoleModel extends Model<IUserRoleAttributes> implements IUserRoleAttributes {
  id?: string;
  name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userRoleInit = (sequelize: Sequelize) => {
  UserRoleModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'user_roles',
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
};

export default UserRoleModel;
