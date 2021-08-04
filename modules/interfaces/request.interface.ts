import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

export default interface IRequest extends Request {
  userID?: string | null | JwtPayload | Schema.Types.ObjectId;
  roles?: string | null;
}
