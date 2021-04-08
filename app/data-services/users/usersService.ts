import { Op } from 'sequelize';
import UserModel, { IUserAttributes } from '../../models/User/UserModel';
import UserRoleModel from '../../models/Privileges/UserRoleModel';

const attributes = ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'];

export const createUser = async (userAttributes: IUserAttributes): Promise<UserModel> => {
  const user = await UserModel.create(userAttributes);

  return user;
};

export const updateUser = async (id: string, userAttributes: IUserAttributes): Promise<UserModel[]> => {
  const [ _, users ] = await UserModel.update(
    userAttributes,
    {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      returning: true,
    },
  );

  return users;
};

export const deleteUser = async (id: string): Promise<number> => {
  const deletedRows = await UserModel.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });

  return deletedRows;
};

export const getUserById = async (id: string): Promise<UserModel> => {
  const user = await UserModel.findOne({
    attributes,
    where: {
      id: {
        [Op.eq]: id
      }
    },
    include: [{ model: UserRoleModel, as: 'roles', attributes: ['name'], through: {attributes: []} }],
  });

  return user;
};

export const getUsers = async (): Promise<UserModel[]> => {
  const users = await UserModel.findAll({
    attributes,
  });

  return users;
}

export const getUserByEmailAndPassword = async (email: string, password: string): Promise<UserModel> => {
  const user = await UserModel.findOne({
    attributes,
    where: {
      email: {
        [Op.eq]: email,
      },
      password: {
        [Op.eq]: password,
      }
    }
  });

  return user;
};
