var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var serverConfig = require('../config/server');
var sha256 = require('sha256');

router.get('/inscriptions', function(req, res, next) {

	if(false){
		res.render('courses-inscriptions-ferme');
	}else{

		var request = {method: 'GET', uri: serverConfig.server+"/categorie/all", resolveWithFullResponse: true};
		var categoriesPromise = rp(request);

		Promise.all([categoriesPromise])
			.then(responses=>{
				categorieList = JSON.parse(responses[0].body);
				if(categorieList != null && categorieList != undefined){
					res.render('courses-inscriptions', { "categories": categorieList });
				}else{
					res.render('courses-inscriptions-ferme');
				}
			})
			.catch(err=>{
				res.render('courses-inscriptions-ferme');
			});

	}

});

router.post('/inscriptions', function(req, res, next) {

	if(req.body.equipe_mdp == req.body.equipe_mdp2){

		var request = {method: 'POST', uri: serverConfig.server+"/equipe/", resolveWithFullResponse: true, body: {"equipe": req.body}, json: true};
		var equipePromise = rp(request);

		Promise.all([equipePromise])
			.then(responses=>{
				if(responses[0].statusCode == 201){
					res.render('courses-connexion', {"messageSucces": "Votre équipe a été créé, vous pouvez vous connecter"});
				}else{
					var message = responses[0].body.message;
					var request = {method: 'GET', uri: serverConfig.server+"/categorie/all", resolveWithFullResponse: true};
					var categoriesPromise = rp(request);

					Promise.all([categoriesPromise])
						.then(responses=>{
							categorieList = JSON.parse(responses[0].body);
							if(categorieList != null && categorieList != undefined){
								res.render('courses-inscriptions', { "categories": categorieList, "messageEchec": message });
							}else{
								res.redirect('/courses/inscriptions');
							}
						})
						.catch(err=>{
							res.redirect('/courses/inscriptions');
						});
				}
			})
			.catch(err =>{
				res.redirect('/courses/inscriptions');
			});
	}else{
		var request = {method: 'GET', uri: serverConfig.server+"/categorie/all", resolveWithFullResponse: true};
		var categoriesPromise = rp(request);

		Promise.all([categoriesPromise])
			.then(responses=>{
				categorieList = JSON.parse(responses[0].body);
				if(categorieList != null && categorieList != undefined){
					res.render('courses-inscriptions', { "categories": categorieList, "messageEchec": "Mots de passes différents" });
				}else{
					res.redirect('/courses/inscriptions');
				}
			})
			.catch(err=>{
				res.redirect('/courses/inscriptions');
			});
	}

});

router.get('/connexion', function(req, res, next) {
	if(!req.session.equipe){
		res.render('courses-connexion');
	}else{
		res.render('courses-mon-espace', {});
	}
});

router.get('/deconnexion', function(req, res, next) {
	if(!req.session.equipe){
		res.redirect('/');
	}else{
		req.session.destroy();
		res.redirect('/');
	}
});

router.post('/connexion', function(req, res, next) {

	var request = {method: 'GET', uri: serverConfig.server+"/equipe/nom/"+req.body.equipe_nom, resolveWithFullResponse: true};
	var equipePromise = rp(request);

	Promise.all([equipePromise])
		.then(responses=>{
			if(JSON.parse(responses[0].body).code == 202){
				res.render('courses-connexion', {"messageEchec":"L'équipe n'existe pas ou mauvaise orthographe"});
			}else{
				var equipe = JSON.parse(responses[0].body);
				if(sha256.x2(req.body.equipe_mdp+equipe.equipe_sel) == equipe.equipe_mdp){
					req.session.equipe = equipe;
					res.render('courses-mon-espace', {"equipe": equipe});
				}else{
					res.render('courses-connexion', {"messageEchec":"Mauvais mot de passe"});
				}
			}
		})
		.catch(err =>{
			console.log(err);
			res.redirect('/courses/connexion');
		});

});

router.get('/informations', function(req, res, next) {
	res.render('courses-informations');
});

router.get('/parcours', function(req, res, next) {
	res.render('courses-parcours');
});

router.get('/resultats', function(req, res, next) {
	res.render('courses-resultats');
});

module.exports = router;
