const express = require('express');
const router = express.Router();
const cfc = require('../../modules/cfc');
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const Article = require('../../models/article');
const User = require('../../models/user');

// list articles per user
router.get('/', (req, res) => {
	Article.where('author').eq(req.user.id).exec((err, articles) => {
		if (err) {
			console.log(err);
		}
		res.render('articles/list', {title:cfc('articles'), articles:articles});
	});
});

// list articles for all users
router.get('/list', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) {
			console.log(err);
		}
		res.render('articles/list', {title:cfc('articles'), articles:articles});
	});
});

// display single article
router.get('/article/:id', (req, res) => {
	Article.findById(req.params.id, (err, art) => {
		if (err) {
			console.log(err);
			return;
		}
		// console.log(art);
		// res.sendStatus(200);
		let result = art;
		User.findById(result.author, (err, user) => {
			let article = {};
			article.title = result.title;
			article.author = cfc(user.fname) + ' ' + cfc(user.lname);
			article.url = result.url || '';
			article.postDate = result.postDate;
			article.postTime = result.postTime;
			article.private = result.private;
			article.body = result.body;
			res.render('articles/article', {title:cfc(result.title), article:article});
		});
	});
});

// add article
router.post('/add', isLoggedIn, (req, res) => {
	let article = new Article();
	article.title = req.body.title;
	article.url = req.body.url || '';
	article.body = req.body.body;
	article.author = req.user.id;
	article.private = req.body.private;
	article.postDate = postDate();
	article.postTime = postTime();

	article.save(function(err){
		if (err) {
			console.log(err);
			return;
		} else {
			req.flash('success', 'Article Added');
			res.redirect('/articles/');
		}
	});
});

// delete article
router.delete('/delete', isLoggedIn, (req, res) => {

});

// search
router.post('/search/all', (req, res) => {
	let searchType = req.body.type;
	let keyword = req.body.search;

	switch (searchType) {
		case 'title':

			break;

		case 'author':
			
			break;
	}
});

module.exports = router;

function postDate() {
	let date = new Date();
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}

function postTime() {
	let date = new Date();
	return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
