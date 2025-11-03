import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'src/express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLODINARY_SECRET_KEY,
});

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image } = req.body;
    const uploadResult = await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
      folder: 'Landmark',
    });
    res.json({ result: uploadResult, message: 'Hello Upload Image' });
  } catch (error) {
    next(error);
  }
};
