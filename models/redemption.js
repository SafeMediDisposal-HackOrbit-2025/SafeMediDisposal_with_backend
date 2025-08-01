const mongoose = require('mongoose');

const RedemptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  pointsRedeemed: {
    type: Number,
    required: true,
  },
  amountInRupees: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('redemption', RedemptionSchema);