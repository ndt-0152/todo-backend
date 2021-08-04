import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { Validate } from '../interfaces/error.interface';
import { NextFunction, Response } from 'express';
import { env } from '../../config/env.variable';
import IRequest from '../interfaces/request.interface';
import {
  loginDB,
  registerDB,
  currentUserDB,
  getUserProfileDB,
  updateUserDB,
} from './users.service';

export const login = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginDB(req);
    if (!user) return next(Validate("This user doesn't exist", 400));
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      const token = jsonwebtoken.sign({ userID: user._id }, env.APPSECRET);
      res.status(200).json({
        status: 'success',
        data: { token, name: user.name, roles: user.roles },
      });
    } else {
      return next(Validate("Password isn't correct", 400));
    }
  } catch (error) {
    next(error);
  }
};
export const register = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerDB(req);
    const token = jsonwebtoken.sign({ userID: user!._id }, env.APPSECRET);
    res.status(200).json({
      status: 'success',
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await currentUserDB(req);
    res.status(200).json({
      status: 'success',
      data: {
        username: data?.username,
        name: data?.name,
        roles: data?.roles,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUserProfileDB();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUsers = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUserDB(req);
    res.status(200).json({
      status: 'success',
      data: {
        information: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
