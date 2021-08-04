var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('animations-animations-old');
});

router.get('/plan', function(req, res, next){
	res.render('animations-plan');
});

module.exports = router;
