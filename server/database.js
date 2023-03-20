const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'svc.sel3.cloudtype.app',
  database: 'patagogodb',
  password: 'root',
  port: 31742,  
});

// client.connect().then(() => {  
//   client.query('SELECT NOW()', (err, res) => {
//     console.log('connected db')
//   });
// });

module.exports = client;
