var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'pwd',
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody('fname', 'First name is required').notEmpty();
	req.checkBody('lname', 'Last name is required').notEmpty();
	req.checkBody('uname', 'Username is required').notEmpty();
	req.checkBody('email', 'Invalid email').isEmail();
	req.checkBody('pwd', 'Password is required').notEmpty();
	req.checkBody('pwd', 'Password requires a minimum length of 4').isLength({min:4});
	req.checkBody('pwd2', 'Passwords don\'t match').equals(req.body.pwd);

	var errors = req.validationErrors();

	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('errors', messages));
	}

	User.findOne({ $or: [{'email':email},{'uname': req.body.uname}] }, function(err, user){
		if (err) {
			return done(err);
		}

		if (user) {
			if (user.uname == req.body.uname) {
				return done(null, false, req.flash('errors', ['Username is already taken']));
			} else if (user.email == req.body.email) {
				return done(null, false, req.flash('errors', ['This email already exists']));
			} else {
				return done(null, false, req.flash('errors', ['User already exists']));
			}
		}

		var newUser = new User();
		newUser.fname = req.body.fname;
		newUser.lname = req.body.lname;
		newUser.uname = req.body.uname;
		newUser.email = email;
		newUser.password = newUser.generateHash(password);
		newUser.admin = req.body.admin;
		newUser.save(function(err, result){
			if (err) {
				return done(err);
			}
			return done(null, newUser);
		});

	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'pwd',
	passReqToCallback: true
}, function(req, email, password, done){
	req.checkBody('username', 'Username or email required').notEmpty();
	req.checkBody('pwd', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null, false, req.flash('errors', messages));
	}

	User.findOne({ $or: [{email: req.body.username}, {uname: req.body.username}]}, function(err, user){
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, req.flash('errors', ['Invalid username or password']));
		}

		if (!user.validPassword(password)) {
			return done(null, false, req.flash('errors', ['Invalid username or password']));
		}

		return done(null, user);
	});

}));
