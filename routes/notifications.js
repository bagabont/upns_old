var router = require('express').Router(),
    bodyParser = require('body-parser'),
    httpErrors = require('../components/httpErrors'),
    messenger = require('../components/unifiedMessenger'),
    Notification = require('../models/notification');

router.use(bodyParser.json());

router.route('/notifications')
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
                    id: notification._id
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

router.route('/notifications/:id')
    .get(function (req, res, next) {
        Notification.findOne({_id: req.params.id}, function (err, notification) {
            if (err) {
                return next(err);
            }
            res.send(notification);
        });
    })
    .post(function (req, res, next) {
        Notification.findOne({_id: req.params.id}, function (err, notification) {
            if (err) {
                return next(err);
            }
            if (!notification || !notification.headers || !notification.payload || !notification.target) {
                return next(httpErrors.BadRequest);
            }

            // push notification to subscribers
            messenger.send(notification);

            // send back notification ID in response
            return res.send({
                notification: {
                    id: notification._id
                }
            });
        });
    });

module.exports = router;