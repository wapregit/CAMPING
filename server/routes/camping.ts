import express from 'express';

import { createCamping, deleteCamping, listCamping, readCamping, updateCamping } from '../controllers/camping';
import { authCheck } from '../middleware/auth';

const router = express.Router();

/**
 * @route   POST   /api/camping
 * @desc    Create a new camping (Private)
 */
router.post('/', authCheck, createCamping);

/**
 * @route   GET    /api/camping
 * @desc    Get all campings (Public)
 */
router.get('/', listCamping);

/**
 * @route   GET    /api/camping/:id
 * @desc    Get camping by ID (Public)
 */
router.get('/:id', readCamping);

/**
 * @route   PUT    /api/camping/:id
 * @desc    Update camping by ID (Private)
 */
router.put('/:id', authCheck, updateCamping);

/**
 * @route   DELETE /api/camping/:id
 * @desc    Delete camping by ID (Private)
 */
router.delete('/:id', authCheck, deleteCamping);

export default router;
