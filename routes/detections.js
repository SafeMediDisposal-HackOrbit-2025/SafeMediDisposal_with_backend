const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Detection = require('../models/detection');
const User = require('../models/user');

// API to save a scan and add points
router.post('/save', auth, async (req, res) => {
  try {
    const { items } = req.body;
    const newDetection = new Detection({ user: req.user.id, items: items });
    await newDetection.save();

    const pointsMap = { glove: 10, syringe: 15, mask: 8, needle: 20 };
    let pointsEarned = 0;
    for (let item in items) {
        pointsEarned += (pointsMap[item] || 5) * items[item];
    }
    
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: pointsEarned } });
    res.status(201).json({ msg: 'Detection result saved' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// API to get scan history
router.get('/history', auth, async (req, res) => {
  try {
    const detections = await Detection.find({ user: req.user.id }).sort({ detectionDate: -1 });
    res.json(detections);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;