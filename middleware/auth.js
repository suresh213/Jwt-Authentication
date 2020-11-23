const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  // check if token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token found' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Setting id of user
    req.id = decoded.id;
    next();
  } catch (error) {
    console.log(err.message);
    res.status(401).json({ msg: 'Token not Valid' });
  }
};
