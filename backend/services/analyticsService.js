const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

/**
 * Overall dashboard stats for admin
 */
const getDashboardStats = async () => {
  const [totalUsers, totalProducts, totalOrders, revenueResult] =
    await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
    ]);

  const totalRevenue = revenueResult[0]?.total || 0;

  return { totalUsers, totalProducts, totalOrders, totalRevenue };
};

/**
 * Revenue grouped by day for the last N days
 */
const getRevenueOverTime = async (days = 30) => {
  const since = new Date();
  since.setDate(since.getDate() - days);

  return Order.aggregate([
    { $match: { createdAt: { $gte: since }, status: { $ne: 'cancelled' } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$totalAmount' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: '$_id', revenue: 1, orders: 1, _id: 0 } },
  ]);
};

/**
 * Top N best-selling products by purchase count
 */
const getTopProducts = async (limit = 10) => {
  return Product.find()
    .sort({ purchaseCount: -1, averageRating: -1 })
    .limit(limit)
    .select('name category price purchaseCount averageRating imageUrl');
};

/**
 * Sales broken down by category
 */
const getSalesByCategory = async () => {
  return Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'productInfo',
      },
    },
    { $unwind: '$productInfo' },
    {
      $group: {
        _id: '$productInfo.category',
        totalSales: { $sum: '$items.quantity' },
        totalRevenue: {
          $sum: { $multiply: ['$items.quantity', '$items.priceAtPurchase'] },
        },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $project: { category: '$_id', totalSales: 1, totalRevenue: 1, _id: 0 } },
  ]);
};

/**
 * New user registrations over the last N days
 */
const getUserGrowth = async (days = 30) => {
  const since = new Date();
  since.setDate(since.getDate() - days);

  return User.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        newUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: '$_id', newUsers: 1, _id: 0 } },
  ]);
};

module.exports = {
  getDashboardStats,
  getRevenueOverTime,
  getTopProducts,
  getSalesByCategory,
  getUserGrowth,
};
