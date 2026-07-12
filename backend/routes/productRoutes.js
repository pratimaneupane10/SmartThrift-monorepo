const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controllers/productController');

const { protect, sellerOrAdmin } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/:id', protect, getProductById);
router.post('/', protect, sellerOrAdmin, createProduct);
router.put('/:id', protect, sellerOrAdmin, updateProduct);
router.delete('/:id', protect, sellerOrAdmin, deleteProduct);
router.post('/:id/review', protect, addReview);
module.exports = router;