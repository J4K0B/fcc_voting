var mongoose = require("mongoose");
//var mongo = require("mongodb").MongoClient;
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
    name: String,
    content: Array,
    options: Array,
    creator: String
});

module.exports = mongoose.model("polls", pollsSchema);