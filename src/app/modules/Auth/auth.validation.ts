import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
// const refreshTokenValidationSchema = z.object({
//   refreshToken: z.string({ required_error: 'Refresh Token is required' }),
// });

export const AuthValidation = {
  loginValidationSchema,
  //refreshTokenValidationSchema,
};
