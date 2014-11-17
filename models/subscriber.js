var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Subscriber = new Schema({
    token: {type: String, required: true, trim: true},
    service: {type: String, required: true, trim: true, index: true},
    platform: {type: String, required: true, index: true},
    country: {type: String, required: false, index: true},
    version: {type: String, required: false, index: true},
    locale: {type: String}
});

Subscriber.virtual('object').get(function () {
    return 'subscriber';
});

module.exports = mongoose.model('subscribers', Subscriber);