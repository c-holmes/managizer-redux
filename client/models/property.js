var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	_id: String,
	slug: String,
	name: String,
	type: String,
	placeholder: String,
	order: Number,
	test: String,
}, { strict: false })

module.exports = mongoose.model('Property', PropertySchema);