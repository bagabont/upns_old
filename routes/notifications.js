var router = require('express').Router(),
    messenger = require('../components/pusher'),
    mongoose = require('mongoose'),
    Notification = require('../models/notification');

module.exports = function (passport, bodyParser) {
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
                return res.status(400).send();
            }
            // store notification.
            var notification = new Notification(data);
            notification.save(function (err) {
                if (err) {
                    return next(err);
                }
                // send back notification ID in response
                res.send({
                    notification: {id: notification.id}
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
            next(new Error('Invalid ID'));
        }
        Notification.findOne({_id: id}, function (err, notification) {
            if (err) {
                return next(err)
            }
            else if (!notification) {
                return res.status(404).send();
            }
            req.notification = notification;
            next();
        });
    });

    router.route('/notifications/:id')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res) {
            res.send(req.notification);
        })
        .post(function (req, res) {
            var notification = req.notification;

            if (!notification || !notification.headers || !notification.payload || !notification.target) {
                return res.status(400).send();
            }
            // push notification to subscribers
            messenger.send(notification);

            // send back notification ID in response
            return res.send({
                notification: {
                    id: notification.id
                }
            });
        })
        .delete(function (req, res) {
            Notification.findOneAndRemove({_id: req.notification}, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(404).send();
                }
                res.end();
            });
        });

    router.route('/notifications/:id/payload')
        .get(function (req, res) {
            var notification = req.notification;
            if (!notification) {
                res.status(404).send();
            }
            res.send({
                payload: notification.payload
            });
        });
    return router;
};