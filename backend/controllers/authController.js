const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// Helper: build the safe user payload returned to the client
function buildUserPayload(user, token) {
  const onboardingComplete = user.role === 'buyer' ? Boolean(user.hasCompletedOnboarding) : true;

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture || '',
    authProvider: user.authProvider || 'email',
    hasCompletedOnboarding: onboardingComplete,
    preferredCategories: user.preferredCategories,
    preferredSizes: user.preferredSizes,
    token,
  };
}

// ── Welcome email HTML ──────────────────────────────────────────────────────
function welcomeEmailHtml(name, role) {
  const label = role === 'seller' ? 'Seller' : 'Buyer';
  const cta   = role === 'seller' ? '🏪 Start Selling' : '🛍 Start Shopping';
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0F2B22 0%, #167084 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; letter-spacing: 2px;">SMART THRIFT</h1>
        <p style="color: rgba(255,255,255,0.7); margin-top: 4px; font-size: 14px;">Ethical Fashion Marketplace</p>
      </div>
      <div style="background: #FFFFFF; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E5E5E5;">
        <h2 style="color: #1A1A1A; margin-top: 0;">Hello ${name},</h2>
        <p style="color: #6B6B6B; line-height: 1.6;">Welcome to Smart Thrift!</p>
        <p style="color: #6B6B6B; line-height: 1.6;">
          Your <strong>${label}</strong> account has been successfully created.
          You can now sign in and start using Smart Thrift.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <div style="display: inline-block; background: #0F2B22; color: #FFFFFF; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">
            ${cta}
          </div>
        </div>
        <p style="color: #6B6B6B; line-height: 1.6;">
          Thank you for joining our community. Together, let's make fashion more sustainable.
        </p>
        <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 24px 0;" />
        <p style="color: #9B9B9B; font-size: 12px;">
          If you did not create this account, please contact our support team immediately.
        </p>
        <p style="color: #9B9B9B; font-size: 12px; margin-bottom: 0;">
          Best regards,<br/>The Smart Thrift Team
        </p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/register
// ─────────────────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!password) return res.status(400).json({ message: 'Password is required for email sign-up' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const allowedSelfRoles = ['buyer', 'seller', 'admin'];
    const finalRole = allowedSelfRoles.includes(role) ? role : 'buyer';

    const userData = { name, email, password, role: finalRole, authProvider: 'email' };
    if (phone) userData.phone = phone;

    const user = await User.create(userData);

    sendEmail({
      to: user.email,
      subject: 'Welcome to Smart Thrift!',
      html: welcomeEmailHtml(user.name, finalRole),
    }).catch((err) => console.error('[Welcome email] Failed to send:', err.message));

    res.status(201).json(buildUserPayload(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/login
// ─────────────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password, expectedRole } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.password) {
      return res.status(401).json({
        message: 'This account uses Google Sign-In. Please continue with Google.'
      });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'This account has been banned' });
    }

    if (expectedRole && user.role !== expectedRole) {
      return res.status(403).json({
        message: `This email is registered as a ${user.role} account. Please log in through the ${user.role} portal.`,
      });
    }

    res.json(buildUserPayload(user, generateToken(user._id)));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/google
// @desc   Google OAuth — find or create user from Google profile
// ─────────────────────────────────────────────────────────────────────────────
const googleAuth = async (req, res) => {
  try {
    const { googleId, email, name, picture, role } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: 'Google ID and email are required' });
    }

    // Look up by googleId first, then fall back to email (account linking)
    let user = await User.findOne({ $or: [{ googleId }, { email }] }).select('+googleId');

    if (user) {
      // Account exists — link Google if it wasn't linked yet
      if (!user.googleId) {
        user.googleId      = googleId;
        user.authProvider  = 'google';
        if (picture && !user.profilePicture) user.profilePicture = picture;
        await user.save({ validateBeforeSave: false });
      }
    } else {
      // New user — create account
      const allowedRoles = ['buyer', 'seller'];
      const finalRole    = allowedRoles.includes(role) ? role : 'buyer';

      user = await User.create({
        name,
        email,
        // Random password so the schema is satisfied; Google users can't use email/password login
        password: crypto.randomBytes(32).toString('hex'),
        role:          finalRole,
        googleId,
        profilePicture: picture || '',
        authProvider:  'google',
      });

      // Send welcome email (non-blocking)
      sendEmail({
        to: user.email,
        subject: 'Welcome to Smart Thrift!',
        html: welcomeEmailHtml(user.name, finalRole),
      }).catch((err) => console.error('[Google welcome email] Failed:', err.message));
    }

    if (user.isBanned) return res.status(403).json({ message: 'This account has been banned' });

    res.json(buildUserPayload(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  GET /api/auth/profile  (protected)
// ─────────────────────────────────────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('viewHistory.product', 'name imageUrl price')
      .populate('purchaseHistory.product', 'name imageUrl price');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  PUT /api/auth/profile  (protected)
// ─────────────────────────────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    const updated = await user.save();
    res.json(buildUserPayload(updated, generateToken(updated._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  PUT /api/auth/onboarding  (protected — buyers only)
// ─────────────────────────────────────────────────────────────────────────────
const saveOnboarding = async (req, res) => {
  try {
    const { preferredCategories, preferredSizes } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (Array.isArray(preferredCategories)) {
      user.preferredCategories = preferredCategories;
    }
    if (preferredSizes && typeof preferredSizes === 'object') {
      user.preferredSizes = {
        tops:    Array.isArray(preferredSizes.tops)    ? preferredSizes.tops    : user.preferredSizes.tops,
        bottoms: Array.isArray(preferredSizes.bottoms) ? preferredSizes.bottoms : user.preferredSizes.bottoms,
        shoes:   typeof preferredSizes.shoes === 'string' ? preferredSizes.shoes  : user.preferredSizes.shoes,
      };
    }
    user.hasCompletedOnboarding = true;
    await user.save();

    res.json(buildUserPayload(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/forgot-password
// @desc   Generate a 6-digit OTP and email it to the user
// ─────────────────────────────────────────────────────────────────────────────
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always respond the same way to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If that email is registered, a reset code has been sent.' });
    }

    // Generate 6-digit numeric OTP
    const otp       = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    user.resetPasswordOTP        = hashedOTP;
    user.resetPasswordOTPExpire  = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    try {
      await sendEmail({
        to: user.email,
        subject: 'Your Smart Thrift Password Reset Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0F2B22 0%, #167084 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; letter-spacing: 2px;">SMART THRIFT</h1>
            </div>
            <div style="background: #FFFFFF; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E5E5E5;">
              <h2 style="color: #1A1A1A; margin-top: 0;">Password Reset Code</h2>
              <p style="color: #6B6B6B; line-height: 1.6;">Hi ${user.name},</p>
              <p style="color: #6B6B6B; line-height: 1.6;">Use the code below to reset your password. It expires in <strong>10 minutes</strong>.</p>
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; background: #F4F5F5; border: 2px dashed #0F2B22; color: #0F2B22; padding: 16px 48px; border-radius: 12px; font-size: 36px; font-weight: 800; letter-spacing: 12px;">
                  ${otp}
                </div>
              </div>
              <p style="color: #6B6B6B; line-height: 1.6;">If you didn't request this, you can safely ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 24px 0;" />
              <p style="color: #9B9B9B; font-size: 12px; margin-bottom: 0;">Best regards,<br/>The Smart Thrift Team</p>
            </div>
          </div>
        `,
      });

      res.json({ message: 'If that email is registered, a reset code has been sent.' });
    } catch (emailError) {
      // Roll back OTP if email fails
      user.resetPasswordOTP       = undefined;
      user.resetPasswordOTPExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({ message: 'Could not send reset email. Please try again.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  POST /api/auth/reset-password
// @desc   Verify OTP and set a new password
// ─────────────────────────────────────────────────────────────────────────────
const resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordOTP:       hashedOTP,
      resetPasswordOTPExpire: { $gt: Date.now() },
    }).select('+resetPasswordOTP +resetPasswordOTPExpire');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please request a new code.' });
    }

    user.password              = password;
    user.resetPasswordOTP       = undefined;
    user.resetPasswordOTPExpire = undefined;
    await user.save();

    // Send confirmation email (non-blocking)
    sendEmail({
      to: user.email,
      subject: 'Your Smart Thrift Password Has Been Changed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F2B22 0%, #167084 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; letter-spacing: 2px;">SMART THRIFT</h1>
          </div>
          <div style="background: #FFFFFF; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E5E5E5;">
            <h2 style="color: #1A1A1A; margin-top: 0;">Password Changed ✓</h2>
            <p style="color: #6B6B6B; line-height: 1.6;">Hi ${user.name},</p>
            <p style="color: #6B6B6B; line-height: 1.6;">
              Your Smart Thrift account password was successfully changed.
              You can now log in with your new password.
            </p>
            <p style="color: #6B6B6B; line-height: 1.6;">
              If you did not make this change, please contact our support team immediately.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 24px 0;" />
            <p style="color: #9B9B9B; font-size: 12px; margin-bottom: 0;">Best regards,<br/>The Smart Thrift Team</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error('[Password changed email] Failed:', err.message));

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route  PUT /api/auth/reset-password/:token  (legacy token-based — kept for compat)
// ─────────────────────────────────────────────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken:  hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpire');

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password            = password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  getProfile,
  updateProfile,
  saveOnboarding,
  forgotPassword,
  resetPasswordWithOTP,
  resetPassword,
};