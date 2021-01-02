import User, { IUserAttributes } from '../../models/User/User';
import { createUser, getUsers, updateUser, getUser } from '../../data-services/users/users';

export const create = async (userAtributes: IUserAttributes): Promise<User> => {
  const user = await createUser(userAtributes);
  
  return user;
}