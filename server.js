var express = require('express');
var mongoose = require('mongoose');
var HttpError = require('./modules/HttpError');

// connect to database
mongoose.connect('mongodb://@localhost/supn');

// create express server
var app = express();
app.disable('x-powered-by');
app.disable('etag');

// create routes
var services = require('./routes/services');

// map routes
app.use('/api/v1', services);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new HttpError(404, 'Not Found');
    next(err);
});

// development error handler
if ('development' === app.get('env')) {
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500).send({
            message: err.message,
            error: err
        });
    });
}

//production error handler
if ('production' === app.get('env')) {
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500).send({
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
