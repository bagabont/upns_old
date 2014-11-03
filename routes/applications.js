var Application = require('../models/application').Application;

var express = require('express');
var router = express.Router();

router.get('/applications', function (req, res) {
    Application.find(function (err, applications) {
        if (!err) {
            // handle result
            res.send(applications);
        } else {
            // error handling
        }
    });
});

router.get('/applications/:name', function (req, res) {
    Application.findOne(function (err, app) {
        if (!err) {
            // handle result
            res.send(app);
        } else {
            // error handling
        }
    });
});

router.post('/applications/:name?', function (req, res, next) {
    var name = req.params.name;
    var description = req.query.description || '';
    if (name) {
        Application.findOne({name: name}, function (err, application) {
            if (!err) {
                // handle result
                if (application) {
                    var badRequestErr = new Error('Application with this name already exists!');
                    badRequestErr.status = 400;
                    next(badRequestErr);
                }
                else {
                    var app = new Application({
                        name: name,
                        description: description
                    });
                    app.save(function (err, app) {
                        if (err) {
                            return console.error(err);
                        }
                        res.status(200).send('OK');
                    });
                }
            } else {
                // error handling
            }
        });
    }
    else {
        var badRequestErr = new Error('Invalid request!');
        badRequestErr.status = 400;
        next(badRequestErr);
    }
});

module.exports = router;
