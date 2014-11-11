#!/usr/bin/env node
var https = require('https'),
    http = require('http'),
    passport = require('passport'),
    User = require('./models/user'),
    express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

require('./config/mongoose')(config);
require('./config/passport')(app, passport);
require('./config/express')(app);
require('./config/routes')(app, passport);

var options = {
    pfx: config.certificate,
    passphrase: config.certificatePassphrase
};

function createAdminAccount() {
    User.findOne({username: 'admin'}, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            return
        }
        user = new User({
            username: 'admin',
            password: 'admin'
        });
        user.save(function (err) {
            if (err) {
                throw err;
            }
            console.log('Admin account created!');
        });
    });
}
createAdminAccount();

// Create an HTTP service.
http.createServer(app).listen(3030, function () {
    console.log('Server listening on port 3030. Server Environment: ' + env);
});

// Create an HTTPS service.
https.createServer(options, app).listen(config.port, function () {
    console.log('Server listening on port ' + config.port + '. Server Environment: ' + env);
});