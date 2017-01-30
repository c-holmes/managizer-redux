var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	_id: String,
	name: String,
	developer: String,
	// dateStart: String
}, { strict: false })

var PropertySchema = new Schema({
	_id: String,
	slug: String,
	name: String,
	type: String,
	placeholder: String,
	order: Number
}, { strict: false })

var AccountSchema = new Schema({
	_id: String,
	name: String,
	slug: String,
	email: String,
	projects: [ProjectSchema],
	properties: [PropertySchema],
}, { strict: false })

module.exports = mongoose.model('Account', AccountSchema);