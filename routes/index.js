const express = require('express');
const router = express.Router();
const cfc = require('../modules/cfc');

// home view
router.get('/', (req, res) => {
	res.render('index', {title:cfc('home')});
});

// about view
router.get('/about', (req, res) => {
	res.render('about', {title:cfc('about')});
});

// contact view
router.get('/contact', (req, res) => {
	res.render('contact', {title:cfc('contact')});
});

module.exports = router;
