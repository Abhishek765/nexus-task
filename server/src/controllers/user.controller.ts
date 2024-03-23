import { Request, Response } from 'express';
import { CreateUserType, UserLoginType } from '../types/user';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_KEY, cookieOptions } from '../constants';

export const register = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response
) => {
  const { email } = req.body;
  try {
    // Checking if user with email  already exists
    const existsUser = await UserModel.findOne({
      email
    });

    if (existsUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const createdUser = await UserModel.create(req.body);

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: 'Something went wrong while registering the user' });
    }

    res
      .status(201)
      .json({ message: 'User Registered Successfully', createdUser });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong while registering the user',
      error
    });
  }
};

export const login = async (
  req: Request<{}, {}, UserLoginType>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'Invalid request!'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: 'Invalid request!'
      });
    }

    // Create the user auth token and send
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name
    };

    const token = jwt.sign(
      payload,
      process.env.AUTH_TOKEN_SECRET!,

      {
        expiresIn: process.env.AUTH_TOKEN_EXPIRY
      }
    );

    res
      .status(200)
      .cookie(AUTH_COOKIE_KEY, token, cookieOptions)
      .json({ user });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong while sign in',
      error
    });
  }
};

export const logout = async (
  _req: Request<{}, {}, UserLoginType>,
  res: Response
) => {
  return res
    .status(200)
    .cookie(AUTH_COOKIE_KEY, '', { ...cookieOptions, maxAge: 0 })
    .json({ message: 'Logged out successfully' });
};
