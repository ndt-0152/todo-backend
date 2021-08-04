import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

export default interface ITodo {
  author?: string | null | JwtPayload | Schema.Types.ObjectId;
  activity?: string;
  status?: Boolean;
  description?: string;
}
