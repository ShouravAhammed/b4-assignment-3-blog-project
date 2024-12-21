# Blog Platform Backend

Welcome to the Blog Platform Backend project! This repository contains the source code for a blogging platform backend built using modern web development practices and technologies.

## Live URL
https://b4-assignment-3-blog-project-eight.vercel.app

# Firstly Setup ## ESLint and Prettier
To maintain code quality and formatting consistency, this project uses ESLint and Prettier.

## Features

*User Roles*
1.Admin:
Can delete any blog.
Can block any user by updating the isBlocked property.
Cannot update any blog.

2.User:
Can register and log in.
Can create, update, and delete their own blogs.
Cannot perform admin actions.

# Authentication & Authorization

*Authentication*:
Users must log in to perform write, update, and delete operations.

*Authorization*:
Role-based access control to differentiate and secure Admin and User roles.
Auth Guard:Middleware that enforces authentication and authorization based on roles before accessing protected routes.

# Blog Management

CRUD operations for blogs by authenticated users.
Public API for reading blogs with:
--> Search: Filter blogs by title or content.
-->Sorting: Sort blogs by fields like createdAt or title.
-->Filtering: Filter blogs by specific criteria, such as author.

# Admin Actions
Block users.
Delete any blog.

# Error Handling
Consistent error responses for validation, authentication, authorization, and server errors.

## Technologies Used

Programming Language: TypeScript
Framework: Node.js with Express.js
Database: MongoDB with Mongoose
Authentication: JSON Web Tokens (JWT)


# Set up environment variables:
Create a .env file in the root directory and configure the following variables:

NODE_ENV=development
PORT = 5000
DATABASE_URL=mongodb+srv://blog_project:PIrjALmTTvDjHlIr@cluster0.cgv1zq7.mongodb.net/blog_project?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS = 12
JWT_ACCESS_SECRET=d7434cae6f696a6710e884488c651c68268cb7eec5922d67217fc92bd120567d
JWT_REFRESH_SECRET=6dbe50b4d3f4af8e3ec75bcfbbea5a6814065ee31be0d2db5a3f019b4a250010151c607e5b8d1ce72ac3908e923bf5c92f32afbfb5c6a38db3c327a39d7aa6ce
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

## Start the development server:


## Access the API at:
Local: http://localhost:5000
Public: https://b4-assignment-3-blog-project-eight.vercel.app

## API Endpoints

*Authentication*
Register UserPOST: /api/auth/register
Login UserPOST: /api/auth/login

*Blog Management*
1.Create BlogPOST: /api/blogs
Request Header:
Authorization: Bearer <token>

2.Update BlogPATCH: /api/blogs/:id
Request Header:
Authorization: Bearer <token>

3.Delete BlogDELETE: /api/blogs/:id
Request Header:
Authorization: Bearer <token>

4.Get All Blogs (Public)GET: /api/blogs
Query Parameters:
search: Search blogs by title or content.
sortBy: Sort blogs by specific fields like createdAt or title.
sortOrder: Defines sorting order (asc or desc).
filter: Filter blogs by author ID.

*Admin Actions*
1.Block UserPATCH: /api/admin/users/:userId/block
Request Header:
Authorization: Bearer <admin_token>

2.Delete BlogDELETE /api/admin/blogs/:id
Request Header:
Authorization: Bearer <admin_token>

## Error Handling
Common Errors
Validation Error: Invalid input data.
Authentication Error: Missing or invalid token.
Authorization Error: Insufficient permissions.
Resource Not Found: Requested resource does not exist.
Server Error: Internal server issues.

#### Here is my "scripts": {
    "build": "tsc",
    "start:pro": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --ignore-path .gitignore --write \"./src**/*.+(js|ts|json)\"",
    "format:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

#### Here is my installation

"dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "http-status": "^2.0.0",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.1",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/bcrypt": "^5.0.2",
    "@types/cookie-parser": "^1.4.8",
    "@types/cors": "^2.8.17",
    "@types/eslint__js": "^8.42.3",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.10.2",
    "eslint": "^9.17.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.14.0",
    "prettier": "^3.4.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.2",
    "typescript-eslint": "^8.18.1"
  }