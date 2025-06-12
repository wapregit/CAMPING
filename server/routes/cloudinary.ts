import { uploadImage } from 'controllers/cloudinary';
import express from 'express';

import { authCheck } from '../middleware/auth';

const router = express.Router();

/**
 * @route   POST   /api/images
 * @desc    Upload Image (Private)
 */
router.post('/', authCheck, uploadImage);

export default router;
