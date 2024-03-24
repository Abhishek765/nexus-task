import { CookieOptions } from 'express';

export const DB_NAME = 'nexus-task';
export const DATA_MODEL_KEYS = {
  User: 'User',
  Task: 'Task'
};

export const AUTH_COOKIE_KEY = 'auth-token';
export const cookieOptions: CookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'none',
  httpOnly: true,
  secure: true
};
