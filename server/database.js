const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'postgres',
  database: 'patagogodb',
  password: 'root',
  port: 5432,  
});

// client.connect().then(() => {  
//   client.query('SELECT NOW()', (err, res) => {
//     console.log('connected db')
//   });
// });

module.exports = client;