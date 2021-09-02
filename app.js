const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { handleError, ErrorHandler } = require('./helpers/custom-error');
const recordRouter = require('./routes/record');
require('dotenv').config()
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/record', recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// other unhandled errors
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
