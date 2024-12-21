import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { Blog } from '../blog/blog.model';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const deleteUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  if (result?.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User Already Blocked');
  }
  return result;
};
const deleteUserBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog Already Deleted');
  }
  return result;
};

export const UserService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserIntoDB,
  deleteUserBlogFromDB,
};
