const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Redemption = require('../models/redemption');
const User = require('../models/user');

// API to process a redemption
router.post('/redeem', auth, async (req, res) => {
  const { pointsToRedeem, method } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (user.points < pointsToRedeem) {
      return res.status(400).json({ msg: 'Insufficient points' });
    }

    user.points -= pointsToRedeem;
    await user.save();

    const newRedemption = new Redemption({
      user: req.user.id,
      pointsRedeemed: pointsToRedeem,
      amountInRupees: Math.floor(pointsToRedeem / 10),
      method: method,
    });
    await newRedemption.save();

    res.json({ msg: 'Redemption successful!', newBalance: user.points });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// API to get redemption history
router.get('/history', auth, async (req, res) => {
    try {
        const redemptions = await Redemption.find({ user: req.user.id }).sort({ transactionDate: -1 });
        res.json(redemptions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;