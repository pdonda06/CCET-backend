// import express from 'express';
// // import { upload } from '../utils/fileUpload.js';
// import { uploadResource, getResources, downloadResource } from '../controllers/resourceController.js';
// import { authenticateToken } from '../middleware/auth.js';
// import upload from '../middleware/upload.js';

// const router = express.Router();

// // Apply authentication middleware where needed
// // router.post('/upload', authenticateToken, upload.single('file'), uploadResource);
// router.post('/upload', upload.single('file'), uploadResource);
// router.get('/', getResources);
// router.get('/download/:id', authenticateToken, downloadResource);

// export default router;


import express from 'express';
import upload from '../middleware/upload.js';
import { uploadResource, getResources, downloadResource } from '../controllers/resourceController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadResource);  // Ensure multer is used
router.get('/', getResources);
router.get('/download/:id', downloadResource);

export default router;
