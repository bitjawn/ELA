const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');
const flash = require('connect-flash');

// user profile
router.get('/profile', csrfProtection, isLoggedIn, (req, res) => {
	res.render('users/profile', {title:cfc('profile')});
});

// logout
router.get('/logout', csrfProtection, function(req, res){
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

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	return res.redirect('/users/signin');
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/users/signin');
	}
	return res.redirect('/users/profile');
}
