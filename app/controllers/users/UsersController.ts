import User from '../../models/User/User';
import IRequest from '../../api/interfaces/IRequest';
import { Op } from 'sequelize';
import { generateAccessToken } from "../../services/auth/AuthService";
import jwt from "jsonwebtoken";

export const createUser = async (req: IRequest): Promise<User> => {
  const {email, firstname, lastname, password} = req.body;

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
  try {
    const token = generateAccessToken(userId);
    console.log('token: ', token);
    console.log('token decoded: ', jwt.decode(token, {complete: true}));
    console.log('token length: ', token.length);
    
    const user = await User.findOne({
      attributes: ['id', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt'],
      where: {
        id: {
          [Op.eq]: userId
        }
      }
    });

    return user;
  } catch (error) {
      console.log(error.message)
  }
}

export const updateUser = async (req: IRequest): Promise<User[]> => {
  const { email, firstname, lastname, password } = req.body;
  const { userId } = req.params;
  // const user = await getUser(req);

  const [ _, users ] = await User.update(
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

  return users;
}