const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const db = require('../config/db.config');
const { configDB } = require('../config/db-auth');
const util = require('util');
require('dotenv').config();

const conn = mysql.createConnection(configDB);

// node native promisify
const query = util.promisify(conn.query).bind(conn);

// Register validation
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

// Check if you are authenticate
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

// Check if you can edit/delete your ticket or modify
exports.checkYourTicketPemisison = async (req, res, next) => {
  try {
    const { userId } = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_KEY
    );
    const result = await query(
      `SELECT * FROM tickets WHERE LOWER(user_id) = LOWER(${db.escape(
        userId
      )});`
    );
    if (result.length) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: `You can do it, only for your comments!` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something is wrong!' });
  }
};
