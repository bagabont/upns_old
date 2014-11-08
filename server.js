var express = require('express'),
    mongoose = require('mongoose'),
    httpErrors = require('./components/HttpErrors'),
    services = require('./routes/services'),
    notifications = require('./routes/notifications'),
    subscribers = require('./routes/subscribers');

// create express server
var app = express();
app.disable('x-powered-by');
app.disable('etag');

// map routes
app.use('/api/v1', services);
app.use('/api/v1', subscribers);
app.use('/api/v1', notifications);

// connect to database
mongoose.connect('mongodb://@localhost/supn');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(httpErrors.NotFound);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500)
            .send({
                message: err.message,
                error: err
            });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500)
        .send({
            message: err.message,
            error: {}
        });
});

module.exports = app;
