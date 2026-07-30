const express = require('express');
const router  = express.Router();
const {
  register,
  login,
  googleAuth,
  getProfile,
  updateProfile,
  saveOnboarding,
  forgotPassword,
  resetPasswordWithOTP,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Email / password auth
router.post('/register', register);
router.post('/login',    login);

// Google OAuth — find-or-create
router.post('/google', googleAuth);

// Protected profile & onboarding
router.get('/profile',    protect, getProfile);
router.put('/profile',    protect, updateProfile);
router.put('/onboarding', protect, saveOnboarding);

// Password reset (OTP-based — current)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',  resetPasswordWithOTP);

// Password reset (token link — legacy, kept for backward compat)
router.put('/reset-password/:token', resetPassword);

module.exports = router;