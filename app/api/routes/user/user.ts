import { Router, Response } from 'express';
import middlewares from '../../middleware';
import IRequest from '../../interfaces/IRequest';

const userRoutes = Router();

const isAuth =  (req: any, res: any, next: any) => {
  if (false)
    res.send({message: 'Not Authenticated', status: 401});
  else
    return next();
}

userRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

userRoutes.get('/me', isAuth, (req: IRequest, res: Response) => {
  return res.json({ user: req.currentUser }).status(200);
});

export default userRoutes;