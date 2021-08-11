const mysql = require('mysql');
const { configDB } = require('./db-auth');

const connection = mysql.createConnection(configDB);

connection.connect();

module.exports = connection;
