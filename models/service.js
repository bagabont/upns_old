var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {type: String, required: true, trim: true, index: {unique: true}},
    platform: {type: String, required: false}
});

module.exports = mongoose.model('services', serviceSchema);