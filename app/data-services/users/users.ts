import User, { IUserAttributes } from '../../models/User/User';
import { Op } from 'sequelize';

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

export const deleteUser = async (id: string) => {
  await User.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'],
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });

    return user;
  } catch (error) {
      console.log(error.message)
  }
};

export const getUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'],
  });

  return users;
}

export const getUserByEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const user = await User.findOne({
    attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'],
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
