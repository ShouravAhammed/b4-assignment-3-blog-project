import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { StatusCodes } from 'http-status-codes';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if the token is sent from the client, verify it
    //const token = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];
    //console.log(token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    // check if the token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    //console.log(decoded);
    const { role, email } = decoded;

    // checking if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This User not found !');
    }

    // checking if the user is already blocked
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This User is Blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized !');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    //console.log('decoded-->', decoded);
    next();
  });
};

export default auth;
