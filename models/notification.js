var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var notificationSchema = new Schema({
    payload: {
        text: {type: String},
        type: {type: String}
    },
    target: {
        id: {type: String},
        services: {type: Array},
        platforms: {type: Array},
        locale: {type: String},
        country: {type: Array},
        version: {type: String}
    }
});

module.exports = mongoose.model('notifications', notificationSchema);
