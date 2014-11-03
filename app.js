var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var applications = require('./routes/applications');

var app = express();

app.use('/', index);
app.use('/login', login);
app.use('/api/v1', applications);

// connect to database
mongoose.connect('mongodb://@localhost/supn');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
            .send({
                message: err.message,
                error: err
            });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});

module.exports = app;
