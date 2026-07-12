const mongoose = require('mongoose');

const analyticSchema = new mongoose.Schema({
  category: { type: String, required: true },
  averagePrice: { type: Number },
  demandScore: { type: Number },
  totalViews: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  snapshotDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytic', analyticSchema);