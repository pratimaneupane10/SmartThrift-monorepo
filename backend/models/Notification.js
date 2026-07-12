const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['message', 'order', 'request', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional reference id (e.g. the order id, request id, or sender id)
    // so the frontend can deep-link to the relevant screen.
    link: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);