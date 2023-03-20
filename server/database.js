const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect().then(() => {
  db.query('SELECT NOW()', (err, res) => {
    console.log('connected db')
  });
});

module.exports = db;
