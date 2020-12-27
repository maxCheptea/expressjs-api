import jwt from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/IRequest';
import env from "../../config/env";

/**
 * Authenticate user and attach it to the request
 *
 * @param {IRequest} req Express req Object
 * @param {Response} res  Express res Object
 * @param {NextFunction} next  Express next Function
 */
const authenticateToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, env.tokenSecret, (err: any, user: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.currentUser = user
    
    next()
  })
}

export default authenticateToken;