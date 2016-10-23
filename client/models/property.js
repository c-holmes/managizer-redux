var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
	slug: String,
	name: String,
	type: String,
	placeholder: String,
	order: Number
})

module.exports = mongoose.model('Property', PropertySchema);