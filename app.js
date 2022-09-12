const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// import routers


require('dotenv').config();

// mongodb connection setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// setting app to use routers for routes


// error handler
app.use(require('./utils/errLogger'));
app.use(require('./utils/errHandler'));

module.exports = app;
