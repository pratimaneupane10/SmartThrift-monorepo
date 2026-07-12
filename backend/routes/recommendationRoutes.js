const express = require('express');
const router = express.Router();
const { personalised, similar, trending } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/personalised', protect, personalised);
router.get('/similar/:productId', similar);
router.get('/trending', trending);

module.exports = router;
