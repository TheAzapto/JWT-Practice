const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const u = await User.findById(id);
  done(null, u);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
  // find or create user
  let user = await User.findOne({ provider: 'github', providerId: profile.id });
  if (!user) {
    user = new User({ username: profile.username, provider: 'github', providerId: profile.id });
    await user.save();
  }
  return done(null, user);
}));

// init endpoints (server must also initialize session middleware)
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // success. You may redirect to a frontend with a session or issue a JWT:
    res.json({ message: 'GitHub login success', user: req.user });
  });

// protect employees route: require req.isAuthenticated()
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({error:'Not authenticated'});
}
const employees = require('./employees');
router.use('/employees', ensureAuth, employees);

module.exports = router;
