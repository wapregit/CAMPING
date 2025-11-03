import express from 'src/express';

import { getProfile, upsertProfile } from '../controllers/profile';
import { authCheck } from '../middleware/auth';

const router = express.Router();

/**
 * @route   POST   /api/profile
 * @desc    Create a new profile (Private)
 */
router.post('/', authCheck, upsertProfile);

/**
 * @route   GET    /api/profile
 * @desc    Get select profiles (Public)
 */
router.get('/', authCheck, getProfile);

export default router;
