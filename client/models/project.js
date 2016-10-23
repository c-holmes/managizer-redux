var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	name: String,
	developer: String,
	dateStart: String
})

module.exports = mongoose.model('Project', ProjectSchema);