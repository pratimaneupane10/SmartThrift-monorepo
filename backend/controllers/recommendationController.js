const {
  getPersonalisedRecommendations,
  getSimilarProducts,
  getTrendingProducts,
} = require('../services/recommendationService');

// @route  GET /api/recommendations/personalised  (protected)
const personalised = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const result = await getPersonalisedRecommendations(req.user._id, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/recommendations/similar/:productId
const similar = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const result = await getSimilarProducts(req.params.productId, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/recommendations/trending
const trending = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const products = await getTrendingProducts(limit);
    res.json({ source: 'trending', products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { personalised, similar, trending };
