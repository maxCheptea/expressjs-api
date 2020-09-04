import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface IUserAttributes {
  id?: number | undefined;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
};

class User extends Model<IUserAttributes> implements IUserAttributes {
  id?: number | undefined;
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
        type: new DataTypes.STRING(100),
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