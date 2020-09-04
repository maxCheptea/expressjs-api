import User from '../../models/User/User';
import IRequest from '../../api/interfaces/IRequest';
import { Op } from 'sequelize';

export const createUser = async (req: IRequest): Promise<User> => {
  const {email, firstname, lastname, password} = req.body;
  console.log(req.body);
  const user = await User.create({
    email, firstname, lastname, password
  });

  return user;
}

export const getUsers = async (req: IRequest): Promise<User[]> => {
  const users = await User.findAll({
    attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt']
  });

  return users;
}

export const getUser = async (req: IRequest): Promise<User> => {
  const { userId } = req.params;
  const user = await User.findOne({
    attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'],
    where: {
      id: {
        [Op.eq]: userId
      }
    }
  });

  return user;
}

export const updateUser = async (req: IRequest): Promise<User> => {
  const { email, firstname, lastname, password } = req.body;
  const { userId } = req.params;
  const user = await getUser(req);


  const user = await User.update(
    {
      email, firstname, lastname, password
    },
    {
      where: {
        id: {
          [Op.eq]: userId
        },
        returning: false
      }
    }
  );

  return user;
}