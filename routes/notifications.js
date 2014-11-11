var router = require('express').Router(),
    bodyParser = require('body-parser'),
    httpErrors = require('../components/httpErrors'),
    messenger = require('../components/unifiedMessenger'),
    mongoose = require('mongoose'),
    Notification = require('../models/notification');

module.exports = function (passport) {
    router.use(bodyParser.json());

    router.route('/notifications')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            Notification.find({}, function (err, notifications) {
                if (err) {
                    return next(err);
                }
                res.send(notifications);
            });
        })
        .post(function (req, res, next) {
            var data = req.body;
            if (!data || !data.headers || !data.payload || !data.target) {
                return next(httpErrors.BadRequest);
            }
            // store notification.
            var notification = new Notification(data);
            notification.save(function (err) {
                if (err) {
                    return next(err);
                }
                // send back notification ID in response
                res.send({
                    notification: {
                        id: notification.id
                    }
                });
                // push notification to subscribers
                messenger.send(notification);
            });
        })
        .delete(function (req, res, next) {
            Notification.remove().exec(function (err) {
                if (err) {
                    return next(err);
                }
            });
            return res.status(204).send();
        });

    router.param('id', function (req, res, next, id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
        Notification.findOne({_id: id}, function (err, notification) {
            if (err) {
                return next(err);
            }
            req.notification = notification;
            next();
        });
    });

    router.route('/notifications/:id')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            res.send(req.notification);
        })
        .post(function (req, res, next) {
            var notification = req.notification;

            if (!notification || !notification.headers || !notification.payload || !notification.target) {
                return next(httpErrors.BadRequest);
            }
            // push notification to subscribers
            messenger.send(notification);

            // send back notification ID in response
            return res.send({
                notification: {
                    id: notification.id
                }
            });
        });

    router.route('/notifications/:id/payload')
        .get(function (req, res, next) {
            var notification = req.notification;
            if (!notification) {
                res.status(404).send(httpErrors.NotFound);
            }
            res.send({
                payload: notification.payload
            });
        });
    return router;
};