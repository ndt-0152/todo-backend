import IRequest from '../interfaces/request.interface';
import ITodo from '../interfaces/todo.interface';
import Todo from '../models/todos.model';

export const readTodosDB = async (req: IRequest) => {
  return await Todo.find({ author: req.userID }).sort({ createdAt: -1 });
};
export const createTodoDB = async (req: IRequest) => {
  const todo: ITodo = {
    author: req.userID,
    activity: req.body.activity,
    status: req.body.status,
    description: req.body.description,
  };
  return await Todo.create(todo);
};

export const updateTodoDB = async (req: IRequest) => {
  const todo: ITodo = {
    author: req.userID,
    activity: req.body.activity,
    status: req.body.status,
    description: req.body.description,
  };
  return await Todo.findOneAndUpdate({ _id: req.params.idTodo }, todo, {
    new: true,
    runValidators: true,
  });
};

export const deleteTodoDB = async (req: IRequest) => {
  return await Todo.findOneAndDelete({ _id: req.params.idTodo });
};
