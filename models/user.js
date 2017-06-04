const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
		uname: {type: String, required: true},
		picture: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required:  true},
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.findByUsername = function(username, cb) {
  return this.find({username: new RegExp(username, 'i')}, cb);
};

module.exports = mongoose.model('User', userSchema);
