const Request = require('../models/Request');
const Product = require('../models/Product');
const Notification = require('../models/Notification');

// @route  POST /api/requests
// @desc   Create a new demand request — product-linked or free-text (protected)
const createRequest = async (req, res) => {
  try {
    const { productId, itemDescription, message } = req.body;

    if (!productId && !itemDescription) {
      return res.status(400).json({
        message: 'Provide either a productId or an itemDescription',
      });
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
    }

    const request = await Request.create({
      user: req.user.id,
      product: productId || null,
      itemDescription: itemDescription || '',
      message: message || '',
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/requests/my
// @desc   Get logged-in user's own requests (protected)
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id })
      .populate('product', 'name price imageUrl')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/requests
// @desc   Get all requests — for admin / demand analytics view (admin only)
const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const requests = await Request.find(query)
      .populate('product', 'name price imageUrl category')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/requests/:id/status
// @desc   Update a request's status (admin only)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['open', 'fulfilled', 'closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await request.save();
    await Notification.create({
      user: request.user,
      type: 'request',
      content: `Your request status has been updated to "${status}"`,
      link: request._id.toString(),
    });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
};