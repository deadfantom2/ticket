const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../config/db.config');
require('dotenv').config();
const { configDB } = require('../config/db-auth');
const util = require('util');
const {
  isLoggedIn,
  checkYourTicketPemisison,
} = require('../middlewares/usersMiddlewares');

const conn = mysql.createConnection(configDB);

// node native promisify
const query = util.promisify(conn.query).bind(conn);

// Add ticket
router.post('/add', isLoggedIn, async (req, res) => {
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

// Modify ticket
router.put(
  '/modify-ticket/:id',
  [isLoggedIn, checkYourTicketPemisison],
  async (req, res) => {
    const ticketId = req.params.id;
    try {
      await query(
        `UPDATE tickets SET titre= ${db.escape(
          req.body.titre
        )}, description=${db.escape(req.body.description)}, status=${db.escape(
          req.body.status
        )}  WHERE id = ${db.escape(ticketId)}`
      );
      return res.status(201).json({ message: 'Ticket modified!' });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: 'Something is wrong!' });
    }
  }
);

// Delete ticket
router.delete(
  '/delete-ticket/:id',
  [isLoggedIn, checkYourTicketPemisison],
  async (req, res) => {
    const ticketId = req.params.id;
    try {
      await query(`DELETE FROM tickets WHERE id = ${db.escape(ticketId)}`);
      return res.status(201).json({ message: 'Ticket deleted!' });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: 'Something is wrong!' });
    }
  }
);

module.exports = router;
