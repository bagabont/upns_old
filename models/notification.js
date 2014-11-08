var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var notificationSchema = new Schema({
    notification: {
        text: {type: String},
        payload: {
            type: {type: String}
        }
    },
    filter: {
        service: {type: Array},
        platform: {type: Array},
        device_id: {type: String},
        locale: {type: String},
        country: {type: String},
        app_version: {type: String}
    }
});

module.exports = mongoose.model('notifications', notificationSchema);
