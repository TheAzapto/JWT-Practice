const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearerAuth');
const employees = require('./employees');

router.use('/employees', bearerAuth, employees);

// Optional: endpoint to display example Bearer token
router.get('/token-info', bearerAuth, (req, res) => res.json({user:req.user}));
module.exports = router;
