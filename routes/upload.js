const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const cloudinary = require('../utils/cloudinary');

// API: POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload buffer lên cloudinary
      const result = await cloudinary.uploader.upload_stream(
         { folder: 'uploads' },
         (error, result) => {
            if (error) {
               return res.status(500).json({ error: 'Upload failed', details: error });
            }
            return res.json({ url: result.secure_url });
         }
      );

      // Gửi dữ liệu ảnh qua stream
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(result);

   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
   }
});

module.exports = router;
