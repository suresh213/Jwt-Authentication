const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post(
  '/',
  [
    check('email', 'Email is invalid').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password should minimum of length 8').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, confirmpassword } = req.body;

    // check password matches or not
    if (password != confirmpassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Passwords do not match' }] });
    }
    try {
      // check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Setting up model
      user = new User({
        email,
        password,
        name,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save model
      await user.save();

      // Setting payload
      const payload = {
        id: user.id,
      };

      // Setting up Jwt authentication
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
