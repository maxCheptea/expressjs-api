import { Router, Response } from 'express';
import authenticateToken from '../../middleware/authenticateToken';
import IRequest from '../../interfaces/IRequest';
import User from '../../../models/User/User';
import { createUser, getUsers, updateUser, getUser } from '../../../controllers/users/UsersController';

const userRoutes = Router();

userRoutes.use(authenticateToken);

userRoutes.post('/', async (req, res) => {
  const user = await createUser(req);
  res.status(200).json({ user }).status(200);
});

userRoutes.get('/getAll', async (req, res) => {
  const users = await getUsers(req);
  res.status(200).json({ users }).status(200);
});

userRoutes.get('/:userId', async (req, res) => {
  const user = await getUser(req);
  res.status(200).json({ user }).status(200);
});

userRoutes.put('/:userId', async (req, res) => {
  const user = await updateUser(req);
  res.status(200).json({ user }).status(200);
});

userRoutes.get('/me', (req: IRequest, res: Response) => {
  return res.json({ user: req.currentUser }).status(200);
});

export default userRoutes;