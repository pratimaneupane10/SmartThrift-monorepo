const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @route  GET /api/wishlist
// @desc   Get logged-in user's wishlist (protected)
const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user: req.user.id })
      .populate('product', 'name price imageUrl category averageRating stock')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/wishlist/:productId
// @desc   Add a product to the logged-in user's wishlist (protected)
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existing = await Wishlist.findOne({ user: req.user.id, product: productId });
    if (existing) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const item = await Wishlist.create({ user: req.user.id, product: productId });

    res.status(201).json({ message: 'Added to wishlist', item });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/wishlist/:productId
// @desc   Remove a product from the logged-in user's wishlist (protected)
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: productId,
    });

    if (!deleted) {
      return res.status(400).json({ message: 'Product not in wishlist' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };