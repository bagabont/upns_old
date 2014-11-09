#!/usr/bin/env node

var express = require('express');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var app = express();

require('./config/express')(app);
require('./config/routes')(app);
require('./config/mongoose')(config);

app.listen(config.port, function () {
    console.log('Server listening on port ' + config.port);
    console.log('Server Environment: ' + env);
});
