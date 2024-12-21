/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true, // Full name of the user
    },
    email: {
      type: String,
      required: true, // Email address for authentication and communication
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user', // Default role
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt fields automatically

userSchema.pre('save', async function (next) {
  const user = this;
  // hashing password and save into mongoDB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
