var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selectOptionSchema = new Schema({
	_id: String,
	name: String,
	order: Number
}, {strict: false })

module.exports = mongoose.model('SelectOption', selectOptionSchema);