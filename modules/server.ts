import express, { Application, NextFunction, Request, Response } from 'express';
import connectDB from './database/connect.db';
import { env } from '../config/env.variable';
import routerUser from './users/users.route';
import IError from './interfaces/error.interface';
import { errorHandler } from './middlewares/validates';
import routerTodo from './todos/todos.route';
import cors from 'cors';

connectDB();

const app: Application = express();
const port = env.APPPORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', routerUser);
app.use('/api/todos', routerTodo);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const err: IError = {
    message: 'This route can be found',
    status: 404,
  };
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server is running with port: %d', port);
});
