const axios = require('axios');
const Product = require('../models/Product');
const User = require('../models/User');

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5001';

/**
 * Calls the Python ML microservice with a user's behaviour data
 * and returns a list of recommended product IDs.
 */
const fetchMLRecommendations = async (userId, userHistory) => {
  try {
    const response = await axios.post(`${ML_API_URL}/recommend`, {
      user_id: userId,
      view_history: userHistory.viewHistory.map((v) => v.product.toString()),
      purchase_history: userHistory.purchaseHistory.map((p) =>
        p.product.toString()
      ),
      ratings: userHistory.ratings.map((r) => ({
        product_id: r.product.toString(),
        score: r.score,
      })),
    });
    return response.data.recommended_product_ids || [];
  } catch (error) {
    console.error('ML API error:', error.message);
    return null; // Fall back to rule-based on failure
  }
};

/**
 * Fallback: return top-rated products in the same categories the user browsed.
 */
const fallbackRecommendations = async (userHistory, limit = 8) => {
  const viewedIds = userHistory.viewHistory.map((v) => v.product);

  // Get categories from viewed products
  const viewedProducts = await Product.find({ _id: { $in: viewedIds } }).select('category');
  const categories = [...new Set(viewedProducts.map((p) => p.category))];

  const query = { _id: { $nin: viewedIds } };
  if (categories.length > 0) query.category = { $in: categories };

  return Product.find(query)
    .sort({ averageRating: -1, purchaseCount: -1 })
    .limit(limit);
};

/**
 * Main export: get personalised recommendations for a logged-in user.
 */
const getPersonalisedRecommendations = async (userId, limit = 8) => {
  const user = await User.findById(userId)
    .populate('viewHistory.product', '_id')
    .populate('purchaseHistory.product', '_id');

  if (!user) throw new Error('User not found');

  // Try ML API first
  const mlIds = await fetchMLRecommendations(userId, user);

  if (mlIds && mlIds.length > 0) {
    const products = await Product.find({ _id: { $in: mlIds } }).limit(limit);
    return { source: 'ml', products };
  }

  // Fallback to rule-based
  const products = await fallbackRecommendations(user, limit);
  return { source: 'fallback', products };
};

/**
 * Similar products for a product detail page (content-based).
 * Calls the ML API; falls back to same-category products.
 */
const getSimilarProducts = async (productId, limit = 6) => {
  try {
    const response = await axios.post(`${ML_API_URL}/similar`, {
      product_id: productId,
      limit,
    });
    const ids = response.data.similar_product_ids || [];
    if (ids.length > 0) {
      const products = await Product.find({ _id: { $in: ids } });
      return { source: 'ml', products };
    }
  } catch (error) {
    console.error('ML similar API error:', error.message);
  }

  // Fallback
  const base = await Product.findById(productId).select('category');
  const products = await Product.find({
    _id: { $ne: productId },
    category: base?.category,
  })
    .sort({ averageRating: -1 })
    .limit(limit);

  return { source: 'fallback', products };
};

/**
 * Trending products (no user context needed) — most viewed & purchased recently.
 */
const getTrendingProducts = async (limit = 8) => {
  const products = await Product.find()
    .sort({ viewCount: -1, purchaseCount: -1 })
    .limit(limit);
  return products;
};

module.exports = {
  getPersonalisedRecommendations,
  getSimilarProducts,
  getTrendingProducts,
};
