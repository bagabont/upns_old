var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {type: String, required: true, trim: true, index: {unique: true}},
    platform: {type: String, enum: ['windows', 'ios', 'android'], required: true}
});

module.exports = mongoose.model('services', serviceSchema);