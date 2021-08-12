const mysql = require('mysql');
const chalk = require('chalk');
const { configDB } = require('./db-auth');

const connection = mysql.createConnection(configDB);

connection.connect((err) => {
  if (!err)
    console.log(chalk.green('✗') + ' Connection DB Established Successfully');
  else
    console.log(
      chalk.red('✗') + ' Connection Failed!' + JSON.stringify(err, undefined, 2)
    );
});

module.exports = connection;
