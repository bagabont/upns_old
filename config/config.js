/**
 * Created by mmarinov on 09-Nov-14.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://@localhost/supn',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://@localhost/supn',
        port: process.env.PORT || 3000
    }
};