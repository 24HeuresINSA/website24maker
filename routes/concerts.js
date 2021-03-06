var express = require('express');
var router = express.Router();

router.get('/timetable', function(req, res, next) {
	res.render('concerts-timetable');
});

router.get('/artistes', function(req, res, next) {
	res.render('concerts-artistes-2021');
});

router.get('/tremplins', function(req, res, next) {
	res.render('concerts-tremplins');
});

module.exports = router;
