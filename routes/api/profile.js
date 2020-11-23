const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// Get Profile route
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Profile route
router.post('/update', auth, async (req, res) => {
  try {
    const { name, location, phone, linkedin, website } = req.body;
    const details = {};

    // Setting up details from body
    if (name) details.name = name;
    if (location) details.location = location;
    if (phone) details.phone = phone;
    if (linkedin) details.linkedin = linkedin;
    if (website) details.website = website;

    // Updating profile
    await User.findByIdAndUpdate(
      { _id: req.id },
      { $set: details },
      { new: true }
    );
    res.json({ msg: 'Profile Updated' });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
