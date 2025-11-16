const User = require('../models/User');
// For demo, we support a static token or token stored per user. Simpler: compare against env var or DB.
module.exports = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).send('Invalid token');

  const token = parts[1];
  // For demo, accept token = process.env.BEARER_TOKEN or check DB field (not implemented)
  if (token === process.env.BEARER_TOKEN) {
    req.user = { special: true, tokenType: 'static' };
    return next();
  }
  // optionally: check a token collection in DB here
  return res.status(401).send('Invalid token');
};
