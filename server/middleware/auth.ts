import { clerkClient, getAuth } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';

import renderError from '../utils/renderError';

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return renderError('User not authenticated', 401);

    const user = await clerkClient.users.getUser(userId);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
