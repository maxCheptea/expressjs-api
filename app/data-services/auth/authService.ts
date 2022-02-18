import { Op } from 'sequelize';
import TokenBlacklistModel from '../../models/Auth/TokenBlacklistModel';

export const blacklistToken = async (token: string): Promise<void> => {
  await TokenBlacklistModel.create({ token });
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await TokenBlacklistModel.findOne({
    attributes: ['token'],
    where: {
      token: {
        [Op.eq]: token,
      },
    },
  });

  return result !== null;
};
