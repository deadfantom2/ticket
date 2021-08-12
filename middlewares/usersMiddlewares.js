const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.validateRegister = (req, res, next) => {
  // name min length 3
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send({
      message: 'Please enter a name with min. 3 chars',
    });
  }
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      message: 'Please enter a password with min. 6 chars',
    });
  }
  // password (repeat) does not match
  if (
    !req.body.password_repeat ||
    req.body.password != req.body.password_repeat
  ) {
    return res.status(400).send({
      message: 'Both passwords must match',
    });
  }
  next();
};

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Your session is not valid!',
    });
  }
};
