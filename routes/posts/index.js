const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const Post = require('../../models/post');

// user profile
router.get('/posts', isLoggedIn, (req, res) => {
	let user = req.user;
	return res.render('users/profile', {
		title:cfc('profile'),
		user:user, greeting:timeOfDay(user),
		fname:cfc(user.fname),
		lname:cfc(user.lname),
		uname:cfc(user.uname),
		email:cfc(user.email)});
	});
module.exports = router;

function postDate() {
	let date = new Date();

}

function postTime() {
	let date = new Date();
	
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash('errors', ['You must be logged in to access this resource']);
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
