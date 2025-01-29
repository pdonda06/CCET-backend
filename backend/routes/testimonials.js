import express from 'express';
import { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticateToken, createTestimonial);
router.put('/:id', authenticateToken, updateTestimonial);
router.delete('/:id', authenticateToken, deleteTestimonial);

export default router;