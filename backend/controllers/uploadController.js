// @route  POST /api/upload/image
// @desc   Upload a single image to Cloudinary, return its URL (seller or admin)
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  res.status(201).json({
    imageUrl: req.file.path,
    publicId: req.file.filename,
  });
};

module.exports = { uploadImage };