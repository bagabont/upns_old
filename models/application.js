var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    name: {type: String, required: true, trim: true, index: {unique: true}},
    description: {type: String, required: false},
    date_created: {type: Date, required: true, default: Date.now}
});

var application = mongoose.model('application', applicationSchema);

module.exports = {
    Application: application
};