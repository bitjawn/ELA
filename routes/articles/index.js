const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const Article = require('../../models/article');

// list articles
router.get('/', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) {
			console.log(err);
		}
		res.render('articles/list', {title:cfc('articles'), articles:articles});
	});
});

// view single article
router.get('/article/:id', (req, res) => {
	Article.findOne({'id':req.params.id}, (err, article) => {
		if (err) {
			console.log(err);
		}
		res.render('articles/article', {title:cfc(article.title), article:article});
	});
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
