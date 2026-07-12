const Message = require('../models/Message');
const mongoose = require('mongoose');

// @route  GET /api/chat/conversations
// @desc   List all conversations for the logged-in user, with the last message each (protected)
const getConversations = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', userId] },
              '$receiver',
              '$sender',
            ],
          },
          lastMessage: { $first: '$content' },
          lastMessageAt: { $first: '$createdAt' },
          lastStatus: { $first: '$status' },
        },
      },
      { $sort: { lastMessageAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'otherUser',
        },
      },
      { $unwind: '$otherUser' },
      {
        $project: {
          _id: 0,
          otherUserId: '$_id',
          name: '$otherUser.name',
          email: '$otherUser.email',
          lastMessage: 1,
          lastMessageAt: 1,
          lastStatus: 1,
        },
      },
    ]);

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/chat/:userId
// @desc   Get full message history between the logged-in user and :userId (protected)
const getMessagesWithUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('product', 'name imageUrl price');

    // Mark messages sent TO the logged-in user as read
    await Message.updateMany(
      { sender: userId, receiver: req.user.id, status: { $ne: 'read' } },
      { $set: { status: 'read' } }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/chat/:userId
// @desc   Send a message via REST (fallback for clients not using sockets) (protected)
const sendMessageRest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content, productId } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: userId,
      product: productId || null,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConversations, getMessagesWithUser, sendMessageRest };