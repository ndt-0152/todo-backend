import { NextFunction, Response } from 'express';
import { RBAC } from '../rbca/roles.access';
import IRequest from '../interfaces/request.interface';
import { Validate } from '../interfaces/error.interface';

export const permissionAccessUsers = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    RBAC.can(req.roles!).createOwn('todos').granted ||
    RBAC.can(req.roles!).updateOwn('todos').granted ||
    RBAC.can(req.roles!).deleteOwn('todos').granted
  )
    return next();
  else return next(Validate("You're not user", 403));
};
export const permissionAccessAdmin = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (RBAC.can(req.roles!).readAny('users').granted) return next();
  else return next(Validate("You're not admin", 403));
};
export const permissionAccess = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (RBAC.can(req.roles!).readAny('users').granted) return next('route');
  else return next();
};
