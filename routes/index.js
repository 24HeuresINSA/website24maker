var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/c==3', function(req, res, next) {
	res.redirect('https://www.forumorg.org/');
});

router.get('/orga', function(req, res, next){
	res.redirect('http://assomaker.24heures.org/login/token/85365b7c91dae190208fa7d7afd990a1?fbclid=IwAR3u8lu_-bKvo2X0H04A0Wp3gepGbsZPMRIU9IVKJ0dThdpoyK_pSZC3s2g');
});

router.get('/partenaires', function(req, res, next) {
	res.render('a-propos-partenaires');
});

router.get('/mentions-legales', function(req, res, next) {
	res.render('mentions-legales');
});

router.get('/organisation', function(req, res, next) {
	res.render('a-propos-organisation');
});

router.get('/benevolat', function(req, res, next) {
	res.render('a-propos-devenir-benevole');
});

router.get('/histoire', function(req, res, next) {
	res.render('a-propos-histoire');
});

module.exports = router;
