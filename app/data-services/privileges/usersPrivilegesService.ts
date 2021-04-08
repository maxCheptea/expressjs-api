import UserRoleModel, { IUserRoleAttributes } from '../../models/Privileges/UserRoleModel';
// import { Op } from 'sequelize';

const attributes = ['id', 'name', 'createdAt', 'updatedAt'];

export const createUser = async (userAttributes: IUserRoleAttributes): Promise<UserRoleModel> => {
  const role = await UserRoleModel.create(userAttributes);

  return role;
};


export const getUserRoles = async (): Promise<UserRoleModel[]> => {
  const roles = await UserRoleModel.findAll({
    attributes,
  });

  return roles;
}
