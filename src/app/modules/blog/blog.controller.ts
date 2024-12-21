import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Blog } from './blog.model';

const createBlog = catchAsync(async (req, res) => {
  //console.log(req.user);
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Author is not found');
  }
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    {
      throw new AppError(StatusCodes.FORBIDDEN, 'This Author is blocked');
    }
  }

  const author = user._id;

  req.body.author = author;

  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  // console.log(req.cookies);
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog Retrieve successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog Retrieve successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  // find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Author is not found');
  }
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    {
      throw new AppError(StatusCodes.FORBIDDEN, 'This Author is blocked');
    }
  }

  // match this blog with user
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not Authorized');
  }

  // update blog
  const result = await BlogServices.updateBlogIntoDB(id, req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  // find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Author is not found');
  }
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    {
      throw new AppError(StatusCodes.FORBIDDEN, 'This Author is blocked');
    }
  }

  // match this blog with user
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are not Authorized');
  }
  await BlogServices.deleteBlogIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog Deleted successfully',
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
