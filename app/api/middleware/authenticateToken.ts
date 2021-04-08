import jwt from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/IRequest';
import env from "../../config/env";
import HttpStatusCode from "../../utils/enums/HttpCodeStatuses";
import { isTokenBlacklisted } from "../../data-services/auth/authService";

/**
 * Authenticate user and attach it to the request
 *
 * @param {IRequest} req Express req Object
 * @param {Response} res  Express res Object
 * @param {NextFunction} next  Express next Function
 */
const authenticateToken = async (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null){
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED) // if there isn't any token
  } 

  const isTokenLoggedOut = await isTokenBlacklisted(token);
  if (isTokenLoggedOut) {
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }

  jwt.verify(token, env.tokenSecret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    }
    req.currentUser = user;
    
    next();
  })
}

export default authenticateToken;
