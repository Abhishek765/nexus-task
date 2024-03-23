import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_KEY } from '../constants';

export type CustomRequestType = {
  user: unknown;
};

export const verifyUserToken = (
  req: Request | CustomRequestType,
  res: Response,
  next: NextFunction
) => {
  let token = (req as Request).cookies[AUTH_COOKIE_KEY];
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access Denied / Unauthorized request' });

  try {
    if (token === 'null' || !token)
      return res.status(401).json({ message: 'Unauthorized request' });

    let verifiedUser = jwt.verify(token, process.env.AUTH_TOKEN_SECRET!);

    if (!verifiedUser)
      return res.status(401).json({ message: 'Unauthorized request' });

    (req as CustomRequestType).user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Credentials' });
  }
};
