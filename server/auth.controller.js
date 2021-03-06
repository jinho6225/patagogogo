const Joi = require('@hapi/joi');
const Account = require('./account');

exports.localRegister = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required().email(),
    pwd: Joi.string().min(6).required(),
  });
  const { email, pwd } = req.body;
  const result = schema.validate({
    email,
    pwd,
  });
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  let existing = null;
  try {
    existing = await Account.findByEmail({ email });
  } catch (e) {
    console.error(e);
  }

  if (existing.length !== 0) {
    res.status(409).send(`${existing[0].email} already exist`);
    return;
  }
  let account = null;
  try {
    account = await Account.registerLocal({
      email,
      pwd,
    });
  } catch (err) {
    console.error(err);
  }
  res.status(200).send(`${account.email} register completed!`);
};

exports.localLogin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required().email(),
    pwd: Joi.string().min(6).required(),
  });
  const { email, pwd } = req.body;
  const result = schema.validate({
    email,
    pwd,
  });
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  let account = null;
  try {
    account = await Account.findByEmail({ email });
  } catch (err) {
    console.error(err);
  }

  if (!account || (await !Account.validatePassword({ email, pwd }))) {
    res.status(403);
    return;
  }
  res.status(200).send(`${account[0].email} login completed`);
};

exports.exists = async (req, res) => {
  const { email } = req.params;
  let account = null;
  try {
    account = await Account.findByEmail({ email });
  } catch (e) {
    console.error(e);
  }

  if (account.length !== 0) {
    res.status(200).send('exists');
  }
};

exports.logout = async (req, res) => {
  res.status(200).send('logout');
};
