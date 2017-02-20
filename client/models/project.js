var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	_id: String,
	// name: String,
	// developer: String,
	// dateStart: String
}, { strict: false })

module.exports = mongoose.model('Project', ProjectSchema);