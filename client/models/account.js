var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	_id: String,
	name: String,
	slug: String,
	user: String,
	projects: Array,
	properties: Array
}, { strict: false })

module.exports = mongoose.model('Account', AccountSchema);