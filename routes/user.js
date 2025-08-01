const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware
const User = require('../models/user'); // Import the User model

// @route   GET /api/user/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    // req.user.id is added by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/user/profile
// @desc    Update user's profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();
    res.json({ msg: 'Profile updated successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;