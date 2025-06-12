import { NextFunction, Request, Response } from 'express';

import prisma from '../config/prisma';

export const upsertProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body;
    const {
      id,
      emailAddresses: [{ emailAddress }],
      _raw: { profile_image_url },
    } = req.user;

    const existingProfile = await prisma.profile.findUnique({
      where: {
        clerkId: id,
      },
    });

    const profile = await prisma.profile.upsert({
      where: {
        clerkId: id,
      },
      create: {
        clerkId: id,
        firstName: firstName,
        lastName: lastName,
        userName: 'wapregit',
        userEmail: emailAddress,
        userImage: profile_image_url,
      },
      update: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    const message = existingProfile ? 'Update profile successfully!' : 'Create profile successfully!';
    const action = existingProfile ? 'update' : 'create';
    res.json({ result: profile, action, message });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;

    const profile = await prisma.profile.findUnique({
      where: {
        clerkId: id,
      },
    });

    res.json({ result: profile });
  } catch (error) {
    next(error);
  }
};
