const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');
const flash = require('connect-flash');

// user profile
router.get('/profile', isLoggedIn, (req, res) => {
	let user = req.user;
	return res.render('users/profile', {
		title:cfc('profile'),
		user:user, greeting:timeOfDay(user),
		fname:cfc(user.fname),
		lname:cfc(user.lname),
		uname:cfc(user.uname),
		email:cfc(user.email)});
	});

// logout
router.get('/signout', csrfProtection, isLoggedIn, function(req, res){
	req.logout();
	res.redirect('/users/signin');
});

// redirection
router.get('/', notLoggedIn, (req, res, next) => {
	next();
});

// signin
router.get('/signin', csrfProtection, (req, res) => {
	let messages = req.flash('errors') || [];
	res.render('users/signin', {
		title:cfc('signin'),
		csrfToken:req.csrfToken(),
		hasErrors:messages.length > 0,
		messages:messages
	});
});

router.post('/signin', csrfProtection, passport.authenticate('local.signin', {
	successRedirect: '/users/profile',
	failureRedirect: '/users/signin',
	failureFlash: true
}));

// signup
router.get('/signup', csrfProtection, (req, res) => {
	let messages = req.flash('errors') || [];
	res.render('users/signup', {
		title:cfc('signup'),
		csrfToken:req.csrfToken(),
		isAdmin:false,
		hasErrors:messages.length > 0,
		messages:messages
	});
});

router.post('/signup', csrfProtection, passport.authenticate('local.signup', {
    successRedirect: '/users/signin',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

module.exports = router;

function timeOfDay(user) {
	let date = new Date(),
		greet = '';

	if (date.getHours() >= 0 && date.getHours() < 12 && date.getMinutes() <= 59) {
		greet = 'Good morning ' + cfc(user.fname);
	} else if (date.getHours() >= 12 && date.getHours() <= 17 && date.getMinutes() <= 59) {
		greet = 'Good afternoon ' + cfc(user.fname);
	} else {
		greet = 'Good evening ' + cfc(user.fname);
	}

	return greet;
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/users/signin');
	}
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/users/signin');
	} else {
		next();
	}
}
