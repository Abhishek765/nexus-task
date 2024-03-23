import { CookieOptions } from 'express';

export const DB_NAME = 'nexus-task';
export const DATA_MODEL_KEYS = {
  User: 'User',
  Task: 'Task'
};

export const AUTH_COOKIE_KEY = 'auth-token';
export const cookieOptions: CookieOptions = {
  // Not creating a refresh token logic, using same token as refresh token
  maxAge: 20 * 60 * 1000,
  sameSite: 'none',
  httpOnly: true,
  secure: true
};
