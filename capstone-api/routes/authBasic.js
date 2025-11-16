const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth');
const employees = require('./employees');

// Use basicAuth for all employee CRUD under /api/basic/employees
router.use('/employees', basicAuth, employees);

// Add an endpoint to create a local user for testing
const User = require('../models/User');
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, provider: 'local' });
  await user.setPassword(password);
  await user.save();
  res.json({ok:true});
});

module.exports = router;
