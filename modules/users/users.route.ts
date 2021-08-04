import { Router } from 'express';
import {
  login,
  register,
  getCurrentUser,
  getUsers,
  updateUsers,
} from './users.controller';
import { checkInputUser } from '../middlewares/validate.input';
import { checkCurrentUser } from '../middlewares/user.authentication';
import { permissionAccessAdmin } from '../middlewares/roles.middleware';

const routerUser = Router();
routerUser.route('/login').post(checkInputUser, login);
routerUser.route('/register').post(checkInputUser, register);
routerUser.route('/currentuser').get(checkCurrentUser, getCurrentUser);
routerUser
  .route('/userprofile')
  .get(checkCurrentUser, permissionAccessAdmin, getUsers);
routerUser.route('/update').put(checkCurrentUser, checkInputUser, updateUsers);
export default routerUser;
