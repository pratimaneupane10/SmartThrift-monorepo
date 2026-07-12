const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Optional — link to an existing product ("I want more of this")
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    // Optional — free-text description ("looking for a size M leather jacket")
    itemDescription: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['open', 'fulfilled', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

// At least one of product / itemDescription must be provided
requestSchema.pre('validate', function (next) {
  if (!this.product && !this.itemDescription) {
    return next(
      new Error('A request needs either a product reference or an item description')
    );
  }
  next();
});

module.exports = mongoose.model('Request', requestSchema);