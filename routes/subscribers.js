var router = require('express').Router(),
    Subscriber = require('../models/subscriber'),
    httpErrors = require('../components/httpErrors');

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
            return next(httpErrors.NotFound);
        } else {
            res.send(req.subscriber);
        }
    })
    .post(function (req, res, next) {
        if (req.subscriber) {
            return res.status(204).send();
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
            return res.status(201).send();
        });
    })
    .put(function (req, res, next) {
        if (!req.subscriber) {
            return next(httpErrors.NotFound);
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
            return next(httpErrors.NotFound);
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
