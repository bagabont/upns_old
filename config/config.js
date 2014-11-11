/**
 * Created by mmarinov on 09-Nov-14.
 */
var path = require('path'),
    fs = require('fs');

var rootPath = path.normalize(__dirname + '../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://@localhost/supn',
        port: process.env.PORT || 3000,
        certificate: fs.readFileSync(__dirname + '/development.pfx')
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://@localhost/supn',
        port: process.env.PORT || 3000,
        certificate: null
    }
};