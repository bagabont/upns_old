var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Event = new Schema({
    headers: {
        type: {type: String},
        text: {type: String}
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

Event.virtual('object').get(function () {
    return 'event';
});

module.exports = mongoose.model('events', Event);
