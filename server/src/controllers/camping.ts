import { NextFunction, Request, Response } from 'src/express';
import renderError from 'src/utils/renderError';

import prisma from '../config/prisma';

export const listCamping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const landmark = await prisma.landmark.findMany();

    res.json({ result: landmark });
  } catch (error) {
    next(error);
  }
};

export const readCamping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const landmark = await prisma.landmark.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!landmark) {
      return renderError('Landmark not found.', 404);
    }

    res.json({ result: landmark });
  } catch (error) {
    next(error);
  }
};

export const createCamping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, category, lat, lng } = req.body;
    const { id: clerkId } = req.user;

    // เช็คว่ามี Profile ไหม
    const profile = await prisma.profile.findUnique({
      where: { clerkId },
    });

    if (!profile) {
      // ถ้าไม่มี ก็สร้างใหม่ หรือแจ้ง error
      return renderError('Profile does not exits.', 404);
    }

    const landmark = await prisma.landmark.create({
      data: {
        title: title,
        price: price,
        description: description,
        category: category,
        lat: lat,
        lng: lng,
        profileId: clerkId,
      },
    });

    const message = 'Create camping successfully!';
    const action = 'create';
    res.json({ result: landmark, action, message });
  } catch (error) {
    next(error);
  }
};

export const updateCamping = (req: Request, res: Response) => {
  try {
    res.json({ message: 'Hello from updateCamping' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteCamping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const landmark = await prisma.landmark.delete({
      where: {
        id: Number(id),
      },
    });

    const message = 'Delete camping successfully!';
    res.json({ result: landmark, message });
  } catch (error) {
    next(error);
  }
};
