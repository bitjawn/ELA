const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var articleSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
		body: {type: String, require: true},
		postDate: {type: String, required: true},
		postTime: {type: String, required: true},
    url: {type: String, required: false},
		private: {type: Boolean, required: true},
});

articleSchema.statics.findByTitle = function(keyword, cb) {
  return this.findOne({title: new RegExp(keyword, 'i')}, cb);
};

articleSchema.statics.findByAuthor = function(keyword, cb) {
  return this.find({author: new RegExp(keyword, 'i')}, cb);
};

articleSchema.statics.findByDate = function(keyword, cb) {
  return this.find({postDate: new RegExp(keyword, 'i')}, cb);
};

module.exports = mongoose.model('Article', articleSchema);
