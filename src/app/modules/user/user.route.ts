import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlwares/auth';

const router = express.Router();

router.get('/users', UserController.getAllUser);
router.get('/users/:userId', UserController.getSingleUser);
router.delete('/users/:userId/block', auth('admin'), UserController.deleteUser);
router.delete('/blogs/:id', auth('admin'), UserController.deleteUserBlog);

export const UserRoutes = router;
