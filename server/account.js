const db = require('./database');
const crypto = require('crypto');

function hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}

const Account = {
  registerLocal: async (req, res) => {
    const { email, pwd } = req;
    const qry =
      'insert into "user" ("email", "pwd", "createdAt") values ($1, $2, NOW()) returning *';
    const params = [email, pwd];
    let register = null;
    try {
      register = await db.query(qry, params);
    } catch (e) {
      console.error(e);
    }
    return register.rows[0];
  },
  localLogin: async (req, res) => {},

  validatePassword: function (pwd) {
    const hashed = hash(pwd);
    return this.pwd === hashed;
  },
};

module.exports = Account;
