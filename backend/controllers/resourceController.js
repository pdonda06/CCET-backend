import Resource from '../models/Resource.js';
import path from 'path';

export const uploadResource = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create resource record with local file path
    const resource = new Resource({
      title,
      description,
      category,
      fileUrl: `/uploads/resources/${file.filename}`, // Store the relative path
      fileType: file.mimetype,
      size: file.size
    });

    await resource.save();

    res.status(201).json({
      message: 'Resource uploaded successfully',
      resource
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading resource' });
  }
};

export const getResources = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = category ? { category } : {};
    
    const resources = await Resource.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await Resource.countDocuments(query);
    
    res.json({
      resources,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
};

// Add a new method to serve files
export const downloadResource = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Remove the leading slash from fileUrl
    const filePath = path.join(process.cwd(), resource.fileUrl.substring(1));
    
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Error downloading resource' });
  }
};



// import Resource from '../models/Resource.js';
// import { uploadToS3 } from '../utils/s3.js';
// import path from 'path';

// export const uploadResource = async (req, res) => {
//   try {
//     const { title, description, category } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Create resource record with local file path
//     const resource = new Resource({
//       title,
//       description,
//       category,
//       fileUrl: `/uploads/resources/${file.filename}`, // Store the relative path
//       fileType: file.mimetype,
//       size: file.size
//     });

//     await resource.save();

//     res.status(201).json({
//       message: 'Resource uploaded successfully',
//       resource
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Error uploading resource' });
//   }
// };

// export const getResources = async (req, res) => {
//   try {
//     const { category, page = 1, limit = 10 } = req.query;
    
//     const query = category ? { category } : {};
    
//     const resources = await Resource.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);
    
//     const total = await Resource.countDocuments(query);
    
//     res.json({
//       resources,
//       total,
//       pages: Math.ceil(total / limit),
//       currentPage: page
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching resources' });
//   }
// };

// // Add a new method to serve files
// export const downloadResource = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const resource = await Resource.findById(id);
//     if (!resource) {
//       return res.status(404).json({ message: 'Resource not found' });
//     }

//     // Remove the leading slash from fileUrl
//     const filePath = path.join(process.cwd(), resource.fileUrl.substring(1));
    
//     res.download(filePath, (err) => {
//       if (err) {
//         console.error('Download error:', err);
//         res.status(500).json({ message: 'Error downloading file' });
//       }
//     });
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ message: 'Error downloading resource' });
//   }
// };