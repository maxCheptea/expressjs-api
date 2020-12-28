import TokenBlacklist from '../../models/Auth/TokenBlacklist';

export const blacklistToken = async (token: string): Promise<void> => {
  await TokenBlacklist.create({ token });
};