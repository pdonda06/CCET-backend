import express from 'express';
import { getAllServices, getServiceById, createService, updateService, deleteService, bookService } from '../controllers/serviceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', authenticateToken, createService);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);
router.post('/:id/book', authenticateToken, bookService);

export default router;