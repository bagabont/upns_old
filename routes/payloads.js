/**
 * Created by mmarinov on 09-Nov-14.
 */

var router = require('express').Router(),
    httpErrors = require('../components/httpErrors'),
    Notification = require('../models/notification');

router.route('/payloads/:id')
    .get(function (req, res, next) {
        Notification.findOne({_id: req.params.id}, function (err, notification) {
            if (err) {
                return next(err);
            }
            if (!notification) {
                res.status(404).send(httpErrors.NotFound);
            }
            res.send(notification.payload);
        });
    });

module.exports = router;