var router = require('express').Router(),
    messenger = require('../components/pusher'),
    mongoose = require('mongoose'),
    Event = require('../models/event');

module.exports = function (passport, bodyParser) {
    router.use(bodyParser.json());

    router.route('/events')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res, next) {
            Event.find({}, function (err, models) {
                if (err) {
                    return next(err);
                }
                var events = [];
                for (var i = 0; i < models.length; i++) {
                    var e = {
                        object: models[i].object,
                        id: models[i].id,
                        headers: models[i].headers,
                        payload: models[i].payload,
                        target: models[i].target
                    };
                    events.push(e);
                }
                res.send(events);
            });
        })
        .post(function (req, res, next) {
            var content = req.body;
            if (!content || !content.headers || !content.payload || !content.target) {
                return res.status(400).send();
            }
            // store event.
            var model = new Event(content);
            model.save(function (err) {
                if (err) {
                    return next(err);
                }
                // send back event ID in response
                res.send({
                    object: model.object,
                    id: model.id
                });
                // push event to subscribers
                messenger.send(model);
            });
        })
        .delete(function (req, res, next) {
            Event.remove().exec(function (err) {
                if (err) {
                    return next(err);
                }
            });
            return res.status(204).send();
        });

    router.param('id', function (req, res, next, id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new Error('Invalid ID'));
        }
        Event.findOne({_id: id}, function (err, model) {
            if (err) {
                return next(err)
            }
            else if (!model) {
                return res.status(404).send();
            }
            req.event = model;
            next();
        });
    });

    router.route('/events/:id')
        .all(passport.authenticate('basic', {session: false}))
        .get(function (req, res) {
            var model = req.event;
            res.send({
                object: model.object,
                id: model.id,
                headers: model.headers,
                payload: model.payload,
                target: model.target
            });
        })
        .post(function (req, res) {
            var model = req.event;

            if (!model || !model.headers || !model.payload || !model.target) {
                return res.status(400).send();
            }
            // push event to subscribers
            messenger.send(model);

            // send back event ID in response
            return res.send({
                object: event.object,
                id: event.id
            });
        })
        .delete(function (req, res) {
            Event.findOneAndRemove({_id: req.event}, function (err) {
                if (err) {
                    return res.status(404).send();
                }
                return res.status(204).send();
            });
        });

    router.route('/events/:id/payload')
        .get(function (req, res) {
            var event = req.event;
            if (!event) {
                res.status(404).send();
            }
            res.send({
                object: 'payload',
                type: event.headers.type,
                payload: event.payload
            });
        });
    return router;
};