const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes — require a valid JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorised, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (req.user.isBanned) {
  return res.status(403).json({ message: 'This account has been banned' });
  }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorised, token failed' });
  }
};

// Admin-only gate (use after protect)
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};

// Seller or admin gate (use after protect) — for posting/managing products & images
const sellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Seller or admin access required' });
};

module.exports = { protect, adminOnly, sellerOrAdmin };

