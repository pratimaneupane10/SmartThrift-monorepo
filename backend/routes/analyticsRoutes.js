const express = require('express');
const router = express.Router();
const { dashboard, revenue, topProducts, categories, userGrowth } = require('../controllers/analyticsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All analytics routes are admin-only
router.use(protect, adminOnly);

router.get('/dashboard', dashboard);
router.get('/revenue', revenue);
router.get('/top-products', topProducts);
router.get('/categories', categories);
router.get('/user-growth', userGrowth);

module.exports = router;
