var express = require('express');
var HttpError = require('../components/HttpError');
var Service = require('../models/service').Service;

var router = express.Router();

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
            return next(new HttpError(404, 'Service not found.'));
        } else {
            res.send(req.service);
        }
    })
    .post(function (req, res, next) {
        if (req.service) {
            return next(new HttpError(409, 'Service already exist.'));
        }
        var service = new Service({
            name: req.params.name,
            description: req.query.description
        });
        service.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(204).send();
        });
    })
    .put(function (req, res, next) {
        if (!req.service) {
            return next(new HttpError(404, 'Service not found.'));
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
            return next(new HttpError(404, 'Service not found.'));
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
