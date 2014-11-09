/**
 * Created by mmarinov on 09-Nov-14.
 */
var httpErrors = require('../components/HttpErrors'),
    services = require('../routes/services'),
    notifications = require('../routes/notifications'),
    subscribers = require('../routes/subscribers');

module.exports = function (app) {
    // set API routers
    app.use('/api/v1', services);
    app.use('/api/v1', subscribers);
    app.use('/api/v1', notifications);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(httpErrors.NotFound);
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