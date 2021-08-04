import { NextFunction, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import IRequest from '../interfaces/request.interface';
import { env } from '../../config/env.variable';
import { currentUserDB } from '../users/users.service';
import { Validate } from '../interfaces/error.interface';
export const checkCurrentUser = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const Authorization = req.header('authorization');
  if (!Authorization) {
    next(Validate("You're must login first", 401));
  } else {
    const token = Authorization.replace('Bearer ', '');
    try {
      const userID = jsonwebtoken.verify(token, env.APPSECRET);
      req.userID = (userID as JwtPayload).userID;
      currentUserDB(req).then((data) => {
        req.roles = data?.roles;
        next();
      });
    } catch (error) {
      next(Validate("You're must login first", 401));
    }
  }
};
