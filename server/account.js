const db = require('./database');
const crypto = require('crypto');

function hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}

const Account = {
  findByEmail: async (req, res) => {
    const { email } = req;
    const qry = 'select * from "user" where "email" = $1';
    const params = [email];
    let duplication = null;
    let existing = null;
    try {
      duplication = await db.query(qry, params);
      existing = duplication.rows.filter((user) => user.email === email);
    } catch (e) {
      console.error(e);
    }
    return existing;
  },

  registerLocal: async (req, res) => {
    const { email, pwd } = req;
    const qry =
      'insert into "user" ("email", "pwd", "createdAt") values ($1, $2, NOW()) returning *';
    const params = [email, hash(pwd)];
    let register = null;
    try {
      register = await db.query(qry, params);
    } catch (e) {
      console.error(e);
    }
    return register.rows[0];
  },

  validatePassword: async (req, res) => {
    const { email, pwd } = req;
    const qry = 'select * from "user" where "email" = $1';
    const params = [email];
    let checkedPWD = null;
    try {
      checkedPWD = await db.query(qry, params);
    } catch (e) {
      console.error(e);
    }
    const hashed = hash(pwd);
    return checkedPWD.rows[0].pwd === hashed;
  },
};

module.exports = Account;
