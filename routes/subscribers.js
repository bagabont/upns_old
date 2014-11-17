var router = require('express').Router(),
    Subscriber = require('../models/subscriber');

module.exports = function (passport) {
    router.route('/subscribers')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            Subscriber.find({}, function (err, models) {
                if (err) {
                    return next(err);
                }
                var subscribers = [];
                for (var i = 0; i < models.length; i++) {
                    var s = {
                        object: models[i].object,
                        id: models[i].id,
                        token: models[i].token,
                        service: models[i].service,
                        platform: models[i].platform,
                        country: models[i].country,
                        version: models[i].version,
                        locale: models[i].locale
                    };
                    subscribers.push(s);
                }
                res.send(subscribers);
            });
        });

    router.param('id', function (req, res, next, id) {
        Subscriber.findOne({id: id}, function (err, model) {
            if (err) {
                return next(err);
            }
            req.subscriber = model;
            next();
        });
    });

    router.route('/subscribers/:id')
        .get(function (req, res) {
            if (!req.subscriber) {
                return res.status(404).send();
            } else {
                var model = req.subscriber;
                res.send({
                    object: model.object,
                    id: model.id,
                    token: model.token,
                    service: model.service,
                    platform: model.platform,
                    country: model.country,
                    version: model.version,
                    locale: model.locale
                });
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
                var model = new Subscriber({
                    id: id,
                    token: token,
                    platform: platform.toLowerCase(),
                    service: service.toLowerCase()
                });
                model.save(function (err) {
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
