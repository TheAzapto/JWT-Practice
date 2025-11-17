const User = require('../models/User');

module.exports = async (req, res, next) => {
    const header = req.headers.authorization || '';
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).send('Invalid Token');

    const token = parts[1];

    if (token === process.env.BEARER_TOKEN) {
        req.user = { special: true, tokenType: 'static' };
        return next();
    }
    // optionally: check a token collection in DB here
    return res.status(401).send('Invalid token');
};
