import { model, Model, Schema } from 'mongoose';
import ITodo from '../interfaces/todo.interface';

const Todo = new Schema<ITodo, Model<ITodo>, ITodo>(
  {
    author: Schema.Types.ObjectId,
    activity: {
      type: String,
      trim: true,
      required: [true, 'Activity must be required'],
    },
    status: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description must be required'],
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITodo>('Todo', Todo);
