var express = require('express'),
    HttpError = require('./components/HttpError'),
    mongoose = require('mongoose'),
    services = require('./routes/services'),
    subscribers = require('./routes/subscribers');

// create express server
var app = express();
app.disable('x-powered-by');
app.disable('etag');

// map routes
app.use('/api/v1', services);
app.use('api/v1', subscribers);

// connect to database
mongoose.connect('mongodb://@localhost/supn');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new HttpError(404, 'Not Found');
    next(err);
});

var environment = app.settings.env || 'development';

// development error handler
if (environment === 'development') {
    app.use(function (err, req, res) {
        res.status(err.statusCode || 500).send({
            message: err.message,
            error: err
        });
    });
}

//production error handler
if (environment === 'production') {
    app.use(function (err, req, res) {
        res.status(err.statusCode || 500).send({
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
