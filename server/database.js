const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'svc.sel3.cloudtype.app',
  database: 'patagogodb',
  password: 'root',
  port: 31268,  
});

// client.connect().then(() => {  
//   client.query('SELECT NOW()', (err, res) => {
//     console.log('connected db')
//   });
// });
// svc.sel3.cloudtype.app:31268 
 

module.exports = client;