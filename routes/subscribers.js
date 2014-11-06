var express = require('express');
var HttpError = require('../components/HttpError');
var Subscriber = require('../models/subscriber').Service;

var router = express.Router();

router.param('id', function (req, res, next, id) {
    Subscriber.findOne({id: id}, function (err, subscriber) {
        if (err) {
            return next(err);
        }
        req.subscriber = subscriber;
        next();
    });
});

router.route('/subscribers/:id?')
    .get(function (req, res, next) {
        if (!req.subscriber) {
            return next(new HttpError(404, 'Subscriber not found.'));
        } else {
            res.send(req.service);
        }
    })
    .post(function (req, res, next) {
        if (req.subscriber) {
            return next(new HttpError(409, 'Subscriber already exist.'));
        }
        var subscriber = new Subscriber({
            id: req.params.id,
            token: req.query.token,
            platform: req.query.platform,
            service: req.query.service
        });
        subscriber.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    })
    .put(function (req, res, next) {
        if (!req.subscriber) {
            return next(new HttpError(404, 'Subscriber not found.'));
        }
        var query = {id: req.params.id};
        var update = {token: req.query.token};
        Subscriber.findOneAndUpdate(query, update, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    })
    .delete(function (req, res, next) {
        if (!req.subscriber) {
            return next(new HttpError(404, 'Subscriber not found.'));
        }
        var query = {id: req.params.id};
        Subscriber.findOneAndRemove(query, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    });

module.exports = router;
