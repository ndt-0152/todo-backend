import { Request, Response, NextFunction } from 'express';
import { Validate } from '../interfaces/error.interface';

export const checkInputUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.roles || req.body.roles === '') {
    next(Validate("You can't set a role", 400));
  } else {
    if (req.url === '/update') {
      if (req.body.username || req.body.username === '') {
        next(Validate("You can't change a username", 400));
      } else next();
    } else next();
  }
};
