import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

// Route imports
import authRoutes from './routes/auth.js'; //done
import blogRoutes from './routes/blogs.js'; //done
import contactRoutes from './routes/contact.js'; //done but without support mail
import resourceRoutes from './routes/resources.js'; //done
import testimonialRoutes from './routes/testimonials.js'; // done 
import serviceRoutes from './routes/services.js'; // done the part of services but remaining for book
import userRoutes from './routes/users.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;