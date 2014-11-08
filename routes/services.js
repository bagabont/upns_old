var router = require('express').Router(),
    Service = require('../models/service'),
    httpErrors = require('../components/HttpErrors');

router.route('/services')
    .get(function (req, res, next) {
        Service.find({}, function (err, services) {
            if (err) {
                return next(err);
            }
            res.send(services);
        });
    });

router.param('name', function (req, res, next, name) {
    Service.findOne({name: name}, function (err, service) {
        if (err) {
            return next(err);
        }
        req.service = service;
        next();
    });
});

router.route('/services/:name')
    .get(function (req, res, next) {
        if (!req.service) {
            return next(httpErrors.NotFound);
        } else {
            res.send(req.service);
        }
    })
    .post(function (req, res, next) {
        if (req.service) {
            return res.status(204).send();
        }
        var service = new Service({
            name: req.params.name,
            description: req.query.description
        });
        service.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(201).send();
        });
    })
    .put(function (req, res, next) {
        if (!req.service) {
            return next(httpErrors.NotFound);
        }
        var query = {name: req.params.name};
        var update = {description: req.query.description};
        Service.findOneAndUpdate(query, update, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    })
    .delete(function (req, res, next) {
        if (!req.service) {
            return next(httpErrors.NotFound);
        }
        var query = {name: req.params.name};
        Service.findOneAndRemove(query, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    });

module.exports = router;
