const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
require('dotenv').config();
const { configDB } = require('../config/db-auth');
const util = require('util');
const {
  validateRegister,
  isLoggedIn,
} = require('../middlewares/usersMiddlewares');
const { encodingPassword, comparePassword } = require('../utils/user-encoding');

const conn = mysql.createConnection(configDB);

// node native promisify
const query = util.promisify(conn.query).bind(conn);

router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM users WHERE LOWER(name) = LOWER(${db.escape(
        req.body.name
      )}) OR LOWER(email) = LOWER(${db.escape(req.body.email)});`
    );
    if (result.length) {
      return res
        .status(409)
        .json({ message: 'This name or email is already in use!' });
    } else {
      const newPwd = await encodingPassword(req.body.password);
      await query(
        `INSERT INTO users (name, email, password) VALUES (
            ${db.escape(req.body.name)},
            ${db.escape(req.body.email)},
            ${db.escape(newPwd)}
            )`
      );
      return res.status(201).json({ message: 'Registered!' });
    }
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Something is wrong!' });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const userInfo = await query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`
    );
    if (!userInfo.length) {
      return res.status(400).json({ message: 'User not found' });
    } else if (
      !(await comparePassword(req.body.password, userInfo[0].password))
    ) {
      return res.status(400).json({ message: 'Password is incorrect' });
    } else {
      const token = await jwt.sign(
        {
          userId: userInfo[0].id,
          email: userInfo[0].email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '7d',
        }
      );
      return res.status(200).json({
        msg: 'Logged in!',
        token,
        user: { email: userInfo[0].email },
      });
    }
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Something is wrong!' });
  }
});

module.exports = router;
