import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import authenticateToken from '../../middleware/authenticateToken';
import HttpStatusCode from '../../../utils/enums/HttpCodeStatuses';
import { create, update, getUser, getAllUsers, removeUser } from '../../../services/users/UsersService';

const notFoundMessage = '404 - Entity not found!';

const userRoutes = Router();

userRoutes.use(authenticateToken);

userRoutes.get('/getAll', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

userRoutes.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUser(userId);
    if (user) {
      res.status(HttpStatusCode.OK).json(user);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send(notFoundMessage);
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

userRoutes.post('/', body('email').isEmail(), async (req, res, next) => {
  try {
    const { firstname, lastname, password, email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({ errors: errors.array()})
    }
    
    const user = await create({ firstname, lastname, password, email });
    res.json(user).status(HttpStatusCode.OK);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

userRoutes.put('/:userId', async (req, res, next) => {
  try {
    const { firstname, lastname, password, email } = req.body;
    const { userId } = req.params;

    const entityUpdated = await update(userId, { firstname, lastname, password, email });

    if (entityUpdated) {
      return res.sendStatus(HttpStatusCode.OK);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).send(notFoundMessage);
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

userRoutes.delete('/:userId', async (req, res, next) => {
  try{
    const { userId } = req.params;
    const isUserDeleted = await removeUser(userId);

    if (isUserDeleted) {
      return res.sendStatus(HttpStatusCode.OK);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).send(notFoundMessage);
    }

  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

export default userRoutes;