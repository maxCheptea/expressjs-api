import User from '../../models/User/User';
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
    const user = await User.findOne({
      attributes: ['id', 'email', 'firstname', 'lastname'],
      where: {
        id: {
          [Op.eq]: 'a82c9f0f-06d8-4dc8-b205-db335a824d43'
        }
      }
    });

    if (user) {
      // eturn res.sendStatus(401);
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