import UserRole, { IUserRoleAttributes } from '../../models/Privileges/UserRole';
// import { Op } from 'sequelize';

const attributes = ['id', 'name', 'createdAt', 'updatedAt'];

export const createUser = async (userAttributes: IUserRoleAttributes): Promise<UserRole> => {
  const role = await UserRole.create(userAttributes);

  return role;
};


export const getUserRoles = async (): Promise<UserRole[]> => {
  const roles = await UserRole.findAll({
    attributes,
  });

  return roles;
}
