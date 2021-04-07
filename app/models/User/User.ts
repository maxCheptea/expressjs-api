import { Sequelize, Model, DataTypes } from "sequelize";
import IBaseModel from "../IBaseModel";

export interface IUserAttributes extends IBaseModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
  id: string | undefined;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const userInit = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      lastname: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
}

export default User;