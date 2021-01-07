import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import authenticateToken from '../../middleware/authenticateToken';
import HttpStatusCode from '../../../utils/enums/HttpCodeStatuses';
import { create, update, getUser, getAllUsers } from '../../../services/users/UsersService';

const userRoutes = Router();

userRoutes.use(authenticateToken);

userRoutes.get('/getAll', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
});

userRoutes.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUser(userId);
    if (user) {
      res.status(HttpStatusCode.OK).json(user);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send('404 - Not found');
    }
  } catch (error) {
    next(error);
  }
});

userRoutes.post('/', body('email').isEmail(), async (req, res, next) => {
  try {
    const { id, firstname, lastname, password, email } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({ errors: errors.array()})
    }
    
    if (id) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    }
    
    const user = await create({ firstname, lastname, password, email });
    res.json(user).status(HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
});

userRoutes.put('/:userId', async (req, res, next) => {
  try {
    const { firstname, lastname, password, email } = req.body;
    const { userId } = req.params;

    const entityUpdated = await update(userId, { firstname, lastname, password, email })
    .catch(error => {
      return res.status(HttpStatusCode.NOT_FOUND).json({message: "Entity not found"});
    });
    
    if (entityUpdated) {
      return res.sendStatus(HttpStatusCode.OK);
    }
  } catch (error) {
    next(error);
  }
});

userRoutes.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params;
});

export default userRoutes;