const {
  getDashboardStats,
  getRevenueOverTime,
  getTopProducts,
  getSalesByCategory,
  getUserGrowth,
} = require('../services/analyticsService');

// @route  GET /api/analytics/dashboard  (admin)
const dashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/analytics/revenue?days=30  (admin)
const revenue = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const data = await getRevenueOverTime(days);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/analytics/top-products?limit=10  (admin)
const topProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await getTopProducts(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/analytics/categories  (admin)
const categories = async (req, res) => {
  try {
    const data = await getSalesByCategory();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/analytics/user-growth?days=30  (admin)
const userGrowth = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const data = await getUserGrowth(days);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { dashboard, revenue, topProducts, categories, userGrowth };
