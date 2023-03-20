const { Client } = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

db.connect().then(() => {
  db.query('SELECT NOW()', (err, res) => {
    console.log('connected db')
  });
});

module.exports = db;
