const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: Number,
  },
  linkedin: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
