var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SelectOptionSchema = new Schema({
	_id: String,
	name: String,
	order: Number
}, {strict: false })

var PropertySchema = new Schema({
	_id: String,
	slug: String,
	name: String,
	type: String,
	placeholder: String,
	order: Number,
	selectOptions: [SelectOptionSchema],
	dateType:Object,
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