import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/error.interface';
export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || 500;
  if (err.errors) {
    err.status = 400;
    err.message = [];
    for (let p in err.errors) {
      err.message.push(err.errors[p].properties!.message!);
    }
  }
  if (err.kind === 'ObjectId') {
    err.status = 400;
    err.message = "ID doesn't exist";
  }
  if (err.code === 11000) {
    err.status = 400;
    err.message = `${err.keyValue?.username} has already existed`;
  }

  res.status(err.status).json({
    status: 'failed',
    message: err.message,
  });
};
