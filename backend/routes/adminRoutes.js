const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  banUser,
  unbanUser,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes require a logged-in admin
router.use(protect, adminOnly);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/ban', banUser);
router.put('/users/:id/unban', unbanUser);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;