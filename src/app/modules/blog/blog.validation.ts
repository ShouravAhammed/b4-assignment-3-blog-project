import { z } from 'zod';

// Zod schema for blog creation
const createBlogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters'),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .min(10, 'Content must be at least 10 characters long'),
  author: z
    .string({
      required_error: 'Author ID is required',
    })
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid author ID format')
    .optional(), // Validates MongoDB ObjectId
  isPublished: z.boolean().optional(), // Optional, defaults to true
});

// Zod schema for blog update
const updateBlogValidationSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters')
    .optional(),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long')
    .optional(),
  isPublished: z.boolean().optional(),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
