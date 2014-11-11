var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Notification = new Schema({
    headers: {
        text: {type: String},
        type: {type: String}
    },
    payload: {},
    target: {
        id: {type: String},
        services: {type: Array},
        platforms: {type: Array},
        locale: {type: String},
        country: {type: Array},
        version: {type: String}
    }
});

module.exports = mongoose.model('notifications', Notification);
