import User from '../models/users.model';
import IRequest from '../interfaces/request.interface';

export const loginDB = async (req: IRequest) => {
  return await User.findOne({ username: req.body.username });
};

export const registerDB = async (req: IRequest) => {
  return await User.create(req.body);
};
export const currentUserDB = async (req: IRequest) => {
  return await User.findOne({ _id: req.userID });
};

export const getUserProfileDB = async () => {
  return await User.find({ roles: 'user' }).sort({ createdAt: -1 });
};

export const updateUserDB = async (req: IRequest) => {
  const user = await User.findOneAndUpdate({ _id: req.userID }, req.body, {
    new: true,
    runValidators: true,
  });
  return await user!.save();
};
