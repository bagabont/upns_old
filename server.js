#!/usr/bin/env node
var https = require('https'),
    http = require('http'),
    passport = require('passport'),
    express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// Load configuration
require('./config/mongoose')(config);
require('./config/passport')(passport);
require('./config/express')(app, passport);

var options = {
    pfx: config.certificate,
    passphrase: config.certificatePassphrase
};

// Create an HTTP service.
http.createServer(app).listen(3030, function () {
    console.log('HTTP Server running on port: ' + 3030);
});

// Create an HTTPS service.
https.createServer(options, app).listen(config.port, function () {
    console.log('HTTPS Server running on port ' + config.port);
});