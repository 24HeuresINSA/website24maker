var express = require('express');
var router = express.Router();

router.get('/inscriptions', function(req, res, next) {
	res.render('courses-inscriptions');
});

router.get('/parcours', function(req, res, next) {
	res.render('courses-parcours');
});

router.get('/resultats', function(req, res, next) {
	res.render('courses-resultats');
});

module.exports = router;
