var express = require('express');
var router = express.Router();

router.get('/timetable', function(req, res, next) {
	res.render('concerts-timetable2');
});

router.get('/artistes', function(req, res, next) {
	res.render('concerts-artistes-2019');
});

module.exports = router;
