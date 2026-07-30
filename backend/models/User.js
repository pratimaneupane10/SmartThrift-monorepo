const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Not required at schema level — Google users get a random password set by the controller.
    password: { type: String, select: false },
    // OAuth
    googleId: { type: String, default: null, select: false },
    profilePicture: { type: String, default: '' },
    authProvider: { type: String, enum: ['email', 'google'], default: 'email' },
    role: { type: String, enum: ['buyer','seller', 'admin'], default: 'buyer',},
    isBanned: { type: Boolean, default: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
    // OTP-based password reset (6-digit code, stored hashed)
    resetPasswordOTP: { type: String, select: false },
    resetPasswordOTPExpire: { type: Date, select: false },

    // Buyer personalisation — set during first-time onboarding
    preferredCategories: { type: [String], default: [] },
    preferredSizes: {
      tops:    { type: [String], default: [] },
      bottoms: { type: [String], default: [] },
      shoes:   { type: String,   default: '' },
    },
    // Flag so onboarding wizard only shows once
    hasCompletedOnboarding: { type: Boolean, default: false },

    viewHistory: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    ],

    purchaseHistory: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);