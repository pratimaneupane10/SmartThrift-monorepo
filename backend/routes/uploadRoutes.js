const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { protect, sellerOrAdmin } = require('../middleware/authMiddleware');

router.post(
  '/image',
  protect,
  sellerOrAdmin,
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error('Upload error:', err.message);
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  uploadImage
);

module.exports = router;