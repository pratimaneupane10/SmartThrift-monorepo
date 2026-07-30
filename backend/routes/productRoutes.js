const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getSimilarProducts,
} = require('../controllers/productController');

const { protect, sellerOrAdmin, optionalAuth } = require('../middleware/authMiddleware');

router.get('/', getProducts);

router.get('/:id/similar', getSimilarProducts);
router.get('/:id', optionalAuth, getProductById);


router.post('/', protect, sellerOrAdmin, createProduct);
router.put('/:id', protect, sellerOrAdmin, updateProduct);
router.delete('/:id', protect, sellerOrAdmin, deleteProduct);

router.post('/:id/review', protect, addReview);

module.exports = router;
