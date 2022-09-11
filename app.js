const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// import routers


require('dotenv').config();

// mongodb setup


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// setting app to use routers for routes


// error handler
app.use(require('./utils/errHandler'));

module.exports = app;
