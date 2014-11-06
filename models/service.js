var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {type: String, required: true, trim: true, index: {unique: true}},
    description: {type: String, required: false},
    date_created: {type: Date, required: true, default: Date.now}
});

var service = mongoose.model('service', serviceSchema);

module.exports = {
    Service: service
};