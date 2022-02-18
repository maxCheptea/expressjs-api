import UserModel from '../../models/User/UserModel';
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/IRequest';
import { Op } from 'sequelize';

/**
 * Attach user to req.currentUser
 *
 * @param {IRequest} req Express req Object
 * @param {Response} res  Express res Object
 * @param {NextFunction} next  Express next Function
 */
const attachCurrentUser = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({
      attributes: ['id', 'email', 'firstname', 'lastname'],
      where: {
        id: {
          [Op.eq]: '11876683-8979-4dc2-8b63-34b93190aea0',
        },
      },
    });

    if (user) {
      Reflect.deleteProperty(user, 'password');
    }

    req.currentUser = user;
    return next();
  } catch (e) {
    console.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;