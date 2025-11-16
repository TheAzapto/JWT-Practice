require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sessions for passport
app.use(cookieSession({ name: 'session', keys: [process.env.SESSION_KEY || 'secret'], maxAge: 24*60*60*1000 }));
app.use(passport.initialize());
app.use(passport.session());

// connect DB
connect(process.env.MONGO_URI);

// mount routes
const authBasic = require('./routes/authBasic');
const authBearer = require('./routes/authBearer');
const authJwt = require('./routes/authJwt');
const authApiKey = require('./routes/authApiKey');
const authOauth = require('./routes/authOauth');

app.use('/api/basic', authBasic);
app.use('/api/bearer', authBearer);
app.use('/api/jwt', authJwt);
app.use('/api/key', authApiKey);
app.use('/api/oauth', authOauth);

// swagger
require('./swagger')(app);

// static frontend for quick demo
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
