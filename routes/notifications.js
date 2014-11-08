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
        var notification = req.body;
        if (!notification || !notification.payload || !notification.target) {
            return next(httpErrors.BadRequest);
        }
        messenger.send(notification);

        var notificationModel = new Notification();
        notificationModel.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.send({
                notification: {
                    id: notificationModel._id
                }
            });
        });
    })
    .delete(function (req, res, next) {
        Notification.remove().exec();
        return res.status(204).send();
    });

module.exports = router;