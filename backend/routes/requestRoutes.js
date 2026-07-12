const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createRequest);
router.get('/my', getMyRequests);
router.get('/', adminOnly, getAllRequests);
router.put('/:id/status', adminOnly, updateRequestStatus);

module.exports = router;