import IRequest from './request.interface';
import { NextFunction } from 'express';
import { Document } from 'mongoose';
import ITodo from './todo.interface';

export type IGeneral = (
  req?: IRequest,
  res?: Response,
  next?: NextFunction
) => Promise<(ITodo & Document<any, any, ITodo>) | null>;
