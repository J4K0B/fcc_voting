var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
    name: String,
    content: Array,
    link: String
});

module.exports = mongoose.model("polls", pollsSchema);