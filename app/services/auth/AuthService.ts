import jwt from "jsonwebtoken";
import env from "../../config/env";
import { getUserByEmailAndPassword, setUserToken } from "../../data-services/users/users";

/**
 * Generate a Token based on the user id.
 * 
 * @param userId The user Db id.
 */
export const generateAccessToken = (userId: string) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ userId }, env.tokenSecret, { expiresIn: '30m' });
};

/**
 * Authenticate a User
 *
 * @param {String} username
 * @param {String} password
 *
 * @returns {String} JWT
 */
export const login = async (username: string, password: string): Promise<string> => {
    const user = await getUserByEmailAndPassword(username, password);
    if (!user) {
      return Promise.reject(new Error('Wrong Email or Password'));
    }
    const { id } = user;
    const token = generateAccessToken(id);
console.log(id);
    await setUserToken(id, token);

    return token;
};