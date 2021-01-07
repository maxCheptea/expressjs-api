import User, { IUserAttributes } from '../../models/User/User';
import { createUser, getUsers, updateUser, getUserById } from '../../data-services/users/users';

export const getUser = async (id: string): Promise<User> => {
  return await getUserById(id);
}

export const getAllUsers = async (): Promise<User[]> => {
  return await getUsers() || [];
}

export const create = async (userAtributes: IUserAttributes): Promise<User> => {
  console.log('userAtributes', userAtributes);
  return await createUser(userAtributes);
}

export const update = async (id: string, userAtributes: IUserAttributes): Promise<boolean> => {
  const users = await updateUser(id, userAtributes);
  return users.length > 0;
}

export const removeUser = async (id: string): Promise<void> => {

}
