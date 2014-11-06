var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subscriberSchema = new Schema({
    id: {type: String, required: true, trim: true, index: {unique: true}},
    token: {type: String, required: true, trim: true},
    service: {type: String, required: true, trim: true, index: true},
    platform: {type: String, required: false},
    date_created: {type: Date, required: true, default: Date.now}
});

var subscriber = mongoose.model('subscriber', subscriberSchema);

module.exports = {
    Subscriber: subscriber
};