import User, { IUserAttributes } from '../../models/User/User';
import { Op } from 'sequelize';

const attributes = ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'];

export const createUser = async (userAttributes: IUserAttributes): Promise<User> => {
  const user = await User.create(userAttributes);

  return user;
};

export const updateUser = async (id: string, userAttributes: IUserAttributes): Promise<User[]> => {
  const [ _, users ] = await User.update(
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
  const deletedRows = await User.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });

  return deletedRows;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await User.findOne({
    attributes,
    where: {
      id: {
        [Op.eq]: id
      }
    }
  });

  return user;
};

export const getUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes,
  });

  return users;
}

export const getUserByEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const user = await User.findOne({
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
