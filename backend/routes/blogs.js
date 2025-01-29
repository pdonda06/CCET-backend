import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// router.get('/', getAllBlogs);
// router.get('/:id', getBlogById);
// router.post('/', createBlog);
// router.put('/:id',  updateBlog);
// router.delete('/:id',  deleteBlog);

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', authenticateToken, createBlog);
router.put('/:id', authenticateToken, updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);

export default router;