const express = require('express');
const mysql = require('mysql');
const router = express.Router();
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

router.post('/add', isLoggedIn, async (req, res, next) => {
  console.log(req.userData.userId);
  try {
    await query(
      `INSERT INTO tickets (user_id, titre, description, status) VALUES (
            ${db.escape(req.userData.userId)},
            ${db.escape(req.body.titre)},
            ${db.escape(req.body.description)},
            ${db.escape(req.body.status)}
            )`
    );
    return res.status(201).json({ message: 'Ticket created!' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Something is wrong!' });
  }
});

module.exports = router;
