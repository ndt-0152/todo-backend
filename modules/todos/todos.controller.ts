import IRequest from '../interfaces/request.interface';
import { NextFunction, Response } from 'express';
import {
  readTodosDB,
  createTodoDB,
  updateTodoDB,
  deleteTodoDB,
} from './todos.service';
import { getUsers } from '../users/users.controller';

export const readTodos = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await readTodosDB(req);
    res.status(200).json({
      status: 'success',
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};
export const readUsers = (req: IRequest, res: Response, next: NextFunction) => {
  getUsers(req, res, next);
};

export const createTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await createTodoDB(req);
    res.status(200).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await updateTodoDB(req);
    res.status(200).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await deleteTodoDB(req);
    res.status(200).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};
