var router = require('express').Router(),
    bodyParser = require('body-parser'),
    httpErrors = require('../components/HttpErrors'),
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
        if (!req.body) {
            return next(httpErrors.BadRequest);
        }
        var notification = new Notification(req.body);
        notification.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.send({
                notification: {
                    id: notification._id
                }
            });
        });
    })
    .delete(function (req, res, next) {
        Notification.remove().exec();
        return res.status(204).send();
    });

module.exports = router;