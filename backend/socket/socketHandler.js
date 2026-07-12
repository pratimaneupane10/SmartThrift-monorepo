const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

// Keeps track of which socket belongs to which user, so we can push
// messages to a specific person even though they might have the app
// open on multiple tabs/devices.
const onlineUsers = new Map(); // userId -> Set of socket ids

const initSocket = (io) => {
  // Authenticate every socket connection using the same JWT used for REST
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error('Not authorised, no token'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return next(new Error('User not found'));
      }
      if (user.isBanned) {
        return next(new Error('This account has been banned'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Not authorised, token failed'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    // Let the sender know who's currently online (optional, useful for a "seen" indicator)
    socket.emit('onlineUsers', Array.from(onlineUsers.keys()));

    // --- Send a message ---
    socket.on('sendMessage', async ({ receiverId, content, productId }) => {
      try {
        if (!receiverId || !content) return;

        const message = await Message.create({
          sender: userId,
          receiver: receiverId,
          product: productId || null,
          content,
        });

        await Notification.create({
          user: receiverId,
          type: 'message',
          content: `New message from ${socket.user.username}`,
          link: `/chat/${userId}`,
        });

        // Deliver to every open connection the receiver has
        const receiverSockets = onlineUsers.get(receiverId);
        if (receiverSockets) {
          message.status = 'delivered';
          await message.save();
          receiverSockets.forEach((sockId) => {
            io.to(sockId).emit('receiveMessage', message);
          });
        }

        // Confirm to the sender that it was saved/sent
        socket.emit('messageSent', message);
      } catch (error) {
        socket.emit('chatError', { message: error.message });
      }
    });

    // --- Mark messages as read ---
    socket.on('messageRead', async ({ senderId }) => {
      try {
        await Message.updateMany(
          { sender: senderId, receiver: userId, status: { $ne: 'read' } },
          { $set: { status: 'read' } }
        );

        const senderSockets = onlineUsers.get(senderId);
        if (senderSockets) {
          senderSockets.forEach((sockId) => {
            io.to(sockId).emit('readReceipt', { readBy: userId });
          });
        }
      } catch (error) {
        socket.emit('chatError', { message: error.message });
      }
    });

    // --- Cleanup on disconnect ---
    socket.on('disconnect', () => {
      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }
    });
  });
};

module.exports = initSocket;