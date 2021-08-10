const express = require('express');
const path = require('path');
require('dotenv').config();

// Init express
const app = express();

// Connect to MongoDB.

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // change * to good URL
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Middlewares
app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname + '/'));

// Routes

module.exports = app;
