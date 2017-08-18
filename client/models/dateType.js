var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DateTypeSchema = new Schema({
	type: String,
	parent: String,
	child: String
},{strict:false })

module.exports = mongoose.model('DateType',DateTypeSchema);