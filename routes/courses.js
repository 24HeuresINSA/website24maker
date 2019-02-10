var express = require('express');
var router = express.Router();

router.get('/inscriptions', function(req, res, next) {

	if(false){
		res.render('courses-inscriptions-ferme');
	}else{
		res.render('courses-inscriptions', { "categories": [
			{
			"categorie_id":"1",
			"categorie_nom":"test",
			"categorie_prix_normal":"18",
			"categorie_prix_va":"15"
			}
		]});
	}

});

router.get('/parcours', function(req, res, next) {
	res.render('courses-parcours');
});

router.get('/connexion', function(req, res, next) {
	res.render('courses-connexion');
});

router.get('/informations', function(req, res, next) {
	res.render('courses-informations');
});

router.get('/resultats', function(req, res, next) {
	res.render('courses-resultats');
});

module.exports = router;
