var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	_id: String,
	slug: String,
	name: String,
	type: String,
	placeholder: String,
	order: Number
}, { strict: false })

var ProjectSchema = new Schema({
	_id: String,
}, { strict: false })

var AccountSchema = new Schema({
	_id: String,
	name: String,
	slug: String,
	email: String,
	properties: [PropertySchema],
	projects: [ProjectSchema],
}, { strict: false })

module.exports = mongoose.model('Account', AccountSchema);