import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface ITokenBlacklistAttributes {
  token: string;
  createdAt?: Date;
}

class TokenBlacklistModel extends Model<ITokenBlacklistAttributes> implements ITokenBlacklistAttributes {
  token: string;

  public readonly createdAt!: Date;
}

export const tokenBlacklistInit = (sequelize: Sequelize) => {
  TokenBlacklistModel.init(
    {
      token: {
        type: new DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      tableName: "token_blacklist",
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    },
  );
}

export default TokenBlacklistModel;
