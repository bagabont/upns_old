var router = require('express').Router(),
    Service = require('../models/service');

module.exports = function (passport) {
    router.route('/services')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            Service.find({}, function (err, models) {
                if (err) {
                    return next(err);
                }
                var services = [];
                for (var i = 0; i < models.length; i++) {
                    var s = {
                        object: models[i].object,
                        name: models[i].name,
                        platform: models[i].platform
                    };
                    services.push(s);
                }
                res.send(services);
            });
        });

    router.param('name', function (req, res, next, name) {
        Service.findOne({name: name}, function (err, model) {
            if (err) {
                return next(err);
            }
            req.service = model;
            next();
        });
    });

    router.route('/services/:name')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res) {
            if (!req.service) {
                return res.status(404).send();
            }
            var service = req.service;
            res.send({
                object: "service",
                id: service.id,
                platform: service.platform
            });
        })
        .post(function (req, res, next) {
            if (req.service) {
                return res.status(204).send();
            }

            var name = req.params.name,
                platform = req.query.platform;

            var model = new Service({
                name: name,
                platform: platform
            });
            model.save(function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(201).send();
            });
        })
        .put(function (req, res, next) {
            if (!req.service) {
                return res.status(404).send();
            }
            var query = {name: req.params.name};
            var update = {platform: req.query.platform};
            Service.findOneAndUpdate(query, update, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(204).send();
            });
        })
        .delete(function (req, res, next) {
            if (!req.service) {
                return res.status(404).send();
            }
            var query = {name: req.params.name};
            Service.findOneAndRemove(query, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(204).send();
            });
        });

    return router;
};
