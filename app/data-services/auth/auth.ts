import { Op } from 'sequelize';
import TokenBlacklist from '../../models/Auth/TokenBlacklist';

export const blacklistToken = async (token: string): Promise<void> => {
  await TokenBlacklist.create({ token });
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await TokenBlacklist.findOne({
    attributes: ['token'],
    where: {
      token: {
        [Op.eq]: token
      }
    } 
  });

  return result !== null;
};