const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const employees = require('./employees');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.validatePassword(password))) return res.status(401).json({error:'Invalid'});
  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});
  res.json({token});
});

// Protect employees with jwtAuth
router.use('/employees', jwtAuth, employees);
module.exports = router;
