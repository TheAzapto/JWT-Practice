const basicAuth = require('basic-auth');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const creds = basicAuth(req);
  if (!creds) return res.status(401).send('Missing credentials');

  const user = await User.findOne({ username: creds.name });
  if (!user) return res.status(401).send('Invalid credentials');

  const valid = await user.validatePassword(creds.pass);
  if (!valid) return res.status(401).send('Invalid credentials');

  req.user = user;
  next();
};
