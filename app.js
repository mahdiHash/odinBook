const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// import routers
const accountsRouter = require('./routes/accounts');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const friendReqRouter = require('./routes/friend-req');
const commentsRouter = require('./routes/comments');

require('dotenv').config();

// mongodb connection setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// session store setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: 'sessions',
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 180, // 180 days
  }
}));

app.use(passport.initialize());

app.use('/accounts', accountsRouter);

// set jwt authentication for all routes other than "/accounts/"
require('./config/passport-jwt');
app.use(passport.authenticate('jwt', { session: false }));

// setting app to use routers for routes
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/friendreq', friendReqRouter);
app.use('/comments', commentsRouter);

// error handler
app.use(require('./utils/errors/errLogger'));
app.use(require('./utils/errors/errHandler'));

module.exports = app;
