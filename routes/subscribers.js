var router = require('express').Router(),
    Subscriber = require('../models/subscriber');

module.exports = function (passport) {
    router.route('/subscribers')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            Subscriber.find({}, function (err, subscribers) {
                if (err) {
                    return next(err);
                }
                res.send(subscribers);
            });
        });

    router.param('id', function (req, res, next, id) {
        Subscriber.findOne({_id: id}, function (err, subscriber) {
            if (err) {
                return next(err);
            }
            req.subscriber = subscriber;
            next();
        });
    });

    // TODO: Allow only admins and the subscriber itself to perform deletion or modification
    router.route('/subscribers/:id?')
        .get(function (req, res, next) {
            if (!req.subscriber) {
                return res.status(404).send();
            } else {
                res.send(req.subscriber);
            }
        })
        .post(function (req, res, next) {
            var id = req.params.id,
                token = req.query.token,
                platform = req.query.platform,
                service = req.query.service;

            if (req.subscriber) {
                var query = {id: id};
                var update = {token: token};
                Subscriber.findOneAndUpdate(query, update, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.status(204).send();
                });
            }
            else {
                var subscriber = new Subscriber({
                    id: id,
                    token: token,
                    platform: platform.toLowerCase(),
                    service: service.toLowerCase()
                });
                subscriber.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.status(201).send();
                });
            }
        })
        .put(function (req, res, next) {
            if (!req.subscriber) {
                return res.status(404).send();
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
                return res.status(404).send();
            }
            var query = {id: req.params.id};
            Subscriber.findOneAndRemove(query, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(204).send();
            });
        });

    return router;
};
