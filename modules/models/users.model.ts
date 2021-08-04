import { model, Model, Schema } from 'mongoose';
import IUser from '../interfaces/user.interface';
import bcryptjs from 'bcryptjs';

const User = new Schema<IUser, Model<IUser>, IUser>(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Username must be required'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password must be required'],
      minLength: [6, 'Password must be at least 6 character'],
    },
    roles: {
      type: String,
      trim: true,
      default: 'user',
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Name must be required'],
    },
  },
  {
    timestamps: true,
  }
);

User.pre<IUser>('save', function (next) {
  let user = this;
  if (user.roles !== 'user' && user.roles !== 'admin') {
    const err = new Error('You just be a user or an admin');
    next(err);
  } else {
    bcryptjs.hash(user.password, 10, function (error, hash) {
      if (error) {
        next(error);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

export default model<IUser>('User', User);
