/**
 * Created by mmarinov on 09-Nov-14.
 */
module.exports = function (app, passport) {
    app.disable('x-powered-by');
    app.disable('etag');

    app.use(passport.initialize());

    var services = require('../routes/services')(passport),
        notifications = require('../routes/notifications')(passport),
        subscribers = require('../routes/subscribers')(passport);

    // set API routers
    app.use('/api/v1', services);
    app.use('/api/v1', subscribers);
    app.use('/api/v1', notifications);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.statusCode = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // do not expose error data in production
        var errorData = app.get('env') === 'development' ? err : {};
        res.status(err.statusCode || 500)
            .send({
                message: err.message,
                error: errorData
            });
    });
};