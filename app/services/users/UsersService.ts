import User, { IUserAttributes } from '../../models/User/User';
import { createUser, getUsers, updateUser, getUserById, deleteUser } from '../../data-services/users/users';

export const getUser = async (id: string): Promise<User> => {
  const user = await getUserById(id).catch(error => {
    return Promise.reject(new Error(error.message));
  });

  return user;
}

export const getAllUsers = async (): Promise<User[]> => {
  const users =  await getUsers().catch(error => {
    return Promise.reject(new Error(error.message));
  });

  return users;
}

export const create = async (userAttributes: IUserAttributes): Promise<User> => {
  const user =  await createUser(userAttributes).catch(error => {
    return Promise.reject(new Error(error.message));
  });

  return user;
}

export const update = async (id: string, userAttributes: IUserAttributes): Promise<boolean> => {
  const users = await updateUser(id, userAttributes).catch(error => {
    return Promise.reject(new Error(error.message));
  });

  return users.length > 0;
}

export const removeUser = async (id: string): Promise<boolean> => {
  const deletedRows = await deleteUser(id).catch(error => {
    return Promise.reject(new Error(error.message));
  });

  return deletedRows > 0;
}
