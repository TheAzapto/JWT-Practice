const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const employees = require('./employees');

router.use('/employees', apiKeyAuth, employees);

// endpoint to generate a new API key for testing (admin action)
const ApiKey = require('../models/ApiKey');
const { v4: uuidv4 } = require('uuid');

router.post('/create-key', async (req, res) => {
  const key = new ApiKey({ label: req.body.label || 'default', key: uuidv4() });
  await key.save();
  res.json({key: key.key});
});

module.exports = router;
