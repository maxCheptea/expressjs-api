import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

interface IUserAttributes {
  id?: number | undefined;
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
};

class Role extends Model<IUserAttributes> implements IUserAttributes {
  id?: number | undefined;
  name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const roleInit = (sequelize: Sequelize) => {
  Role.init(
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
      tableName: "roles",
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
}

export default Role;