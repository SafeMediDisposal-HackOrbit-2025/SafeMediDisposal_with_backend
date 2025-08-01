const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  detectionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('detection', DetectionSchema);