var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subscriberSchema = new Schema({
    id: {type: String, required: true, trim: true, index: {unique: true}},
    token: {type: String, required: true, trim: true},
    service: {type: String, required: true, trim: true, index: true},
    platform: {type: String, required: true, index: true},
    country: {type: String, required: false, index: true},
    version: {type: String, required: false, index: true},
    locale: {type: String}
});

module.exports = mongoose.model('subscribers', subscriberSchema);