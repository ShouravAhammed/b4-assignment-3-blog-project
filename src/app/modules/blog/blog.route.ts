import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlog);
router.get('/:id', BlogControllers.getSingleBlog);
router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete('/:id', auth('user'), BlogControllers.deleteBlog);

export const BlogRoutes = router;
