import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUSer } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utiles';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUSer) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This User not found !');
  }

  // checking if the user is already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This User is Blocked !');
  }

  // checking if the user password is correct
  if (!(await bcrypt.compare(payload.password, user.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Password !');
  }

  // Access Granted : Send AccessToken,RefreshToken
  // create token and sent to the client
  const jwtPayload = {
    email: user.email,
    role: user.role ?? '',
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { token, refreshToken };
};

const refreshToken = async (token: string) => {
  // check if the token is valid

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This User not found !');
  }

  // checking if the user is already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This User is Deleted !');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role ?? '',
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
  refreshToken,
};
