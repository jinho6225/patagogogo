const pg = require('pg');

const db = new pg.Pool({
  host: "0.0.0.0",
  user: 'root',
  password: 'root',
  database: 'patagogodb',
  port: 5432,
  min: 5,
  max: 50,
})

db.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})

module.exports = db;
