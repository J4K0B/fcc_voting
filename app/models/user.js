var mongoose = require("mongoose");
//var mongo = require("mongodb").MongoClient;
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var userSchema = new Schema({
        email: String,
        password: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("users", userSchema);