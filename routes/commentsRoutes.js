const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../config/db.config');
require('dotenv').config();
const { configDB } = require('../config/db-auth');
const util = require('util');
const {
  isLoggedIn,
  checkYourCommentPemisison,
} = require('../middlewares/usersMiddlewares');

const conn = mysql.createConnection(configDB);

// node native promisify
const query = util.promisify(conn.query).bind(conn);

// Add comment
router.post('/add', isLoggedIn, async (req, res) => {
  console.log(req.userData.userId);
  try {
    await query(
      `INSERT INTO comments (user_id, ticket_id, description) VALUES (
              ${db.escape(req.userData.userId)},
              ${db.escape(req.body.ticket_id)},
              ${db.escape(req.body.description)}
              )`
    );
    return res.status(201).json({ message: 'Comment created!' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Something is wrong!' });
  }
});

// Modify comment
router.put(
  '/modify-comment/:id',
  [isLoggedIn, checkYourCommentPemisison],
  async (req, res) => {
    const commentId = req.params.id;
    try {
      await query(
        `UPDATE comments SET description= ${db.escape(
          req.body.description
        )} WHERE id = ${db.escape(commentId)}`
      );
      return res.status(201).json({ message: 'Comment modified!' });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: 'Something is wrong!' });
    }
  }
);

// Delete comment
router.delete(
  '/delete-comment/:id',
  [isLoggedIn, checkYourCommentPemisison],
  async (req, res) => {
    const commentId = req.params.id;
    try {
      await query(`DELETE FROM comments WHERE id = ${db.escape(commentId)}`);
      return res.status(201).json({ message: 'Comment deleted!' });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: 'Something is wrong!' });
    }
  }
);

module.exports = router;
