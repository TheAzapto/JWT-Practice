const ApiKey = require('../models/ApiKey');
module.exports = async (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key) return res.status(401).json({error:'Missing API key'});

  const found = await ApiKey.findOne({key, active: true});
  if (!found) return res.status(401).json({error:'Invalid API key'});
  req.apiKey = found;
  next();
};
