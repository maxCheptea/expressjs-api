import { Router, Response } from 'express';
import middlewares from '../../middleware';
import IRequest from '../../interfaces/IRequest';
import User from '../../../models/User/User';
import { createUser, getUsers, updateUser, getUser } from '../../../controllers/users/UsersController';

const userRoutes = Router();

const isAuth =  (req: any, res: any, next: any) => {
  if (false)
    res.send({message: 'Not Authenticated', status: 401});
  else
    return next();
}

userRoutes.post('/user/', async (req, res) => {
  const user = await createUser(req);
  res.status(200).json({ user }).status(200);
});

userRoutes.get('/users/', async (req, res) => {
  const users = await getUsers(req);
  res.status(200).json({ users }).status(200);
});

userRoutes.get('/user/:userId', async (req, res) => {
  const user = await getUser(req);
  res.status(200).json({ user }).status(200);
});

userRoutes.put('/user/:userId', async (req, res) => {
  const user = await updateUser(req);
  res.status(200).json({ user }).status(200);
});


userRoutes.get('/user/me', isAuth, (req: IRequest, res: Response) => {
  return res.json({ user: req.currentUser }).status(200);
});

export default userRoutes;