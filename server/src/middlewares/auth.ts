import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export type CustomRequestType = {
  user: unknown;
};

export const verifyUserToken = (
  req: Request | CustomRequestType,
  res: Response,
  next: NextFunction
) => {
  let token = (req as Request).headers.authorization;
  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request');

  try {
    token = token.split(' ')[1]; //! Remove Bearer from string

    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request');

    let verifiedUser = jwt.verify(token, process.env.AUTH_TOKEN_SECRET!);
    if (!verifiedUser) return res.status(401).send('Unauthorized request');

    (req as CustomRequestType).user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
