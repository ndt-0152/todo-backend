import { Router } from 'express';
import { checkCurrentUser } from '../middlewares/user.authentication';
import {
  readTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  readUsers,
} from './todos.controller';
import {
  permissionAccessUsers,
  permissionAccess,
} from '../middlewares/roles.middleware';

const routerTodo = Router();
routerTodo
  .route('/')
  .get(checkCurrentUser, permissionAccess, readTodos)
  .post(checkCurrentUser, permissionAccessUsers, createTodo);
routerTodo.route('/').get(readUsers);
routerTodo
  .route('/:idTodo')
  .put(checkCurrentUser, permissionAccessUsers, updateTodo)
  .delete(checkCurrentUser, permissionAccessUsers, deleteTodo);

export default routerTodo;
