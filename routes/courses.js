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

router.post('/ajouter-coureur', function(req, res, next) {

	if(req.session.equipe){

		var coureur =
		{
			"coureur_prenom": req.body.coureur_prenom,
			"coureur_nom": req.body.coureur_nom,
			"coureur_equipe": req.session.equipe.equipe_id,
			"coureur_etudiant": req.body.coureur_etudiant,
			"coureur_date_naissance": req.body.coureur_date_naissance,
			"coureur_taille_tee_shirt": req.body.coureur_taille_tee_shirt,
			"coureur_telephone": req.body.coureur_telephone,
			"coureur_email": req.body.coureur_email,
			"coureur_commentaire": req.body.coureur_commentaire,
		};
		var request = {method: 'POST', uri: serverConfig.server+"/coureur/", resolveWithFullResponse: true, body: {"coureur": coureur}, json: true};
		var coureurPromise = rp(request);

		Promise.all([coureurPromise])
			.then(responses=>{
				if(responses[0].statusCode == 201){
					res.redirect('/courses/connexion');
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
							console.log('----> '+err);
							res.redirect('/courses/inscriptions');
						});
				}
			})
			.catch(err =>{
				console.log(err);
				res.redirect('/courses/inscriptions');
			});
	}else{
		res.redirect('/');
	}

});

router.post('/updater-coureur', function(req, res, next) {

	if(req.session.equipe){

		var coureur =
			{
				"coureur_prenom": req.body.coureur_prenom,
				"coureur_nom": req.body.coureur_nom,
				"coureur_etudiant": req.body.coureur_etudiant,
				"coureur_equipe": req.session.equipe.equipe_id,
				"coureur_date_naissance": req.body.coureur_date_naissance,
				"coureur_taille_tee_shirt": req.body.coureur_taille_tee_shirt,
				"coureur_telephone": req.body.coureur_telephone,
				"coureur_email": req.body.coureur_email,
				"coureur_commentaire": req.body.coureur_commentaire,
			};
		var request = {method: 'PUT', uri: serverConfig.server+"/coureur/"+req.body.coureur_id, resolveWithFullResponse: true, body: {"coureur": coureur}, json: true};
		var coureurPromise = rp(request);

		Promise.all([coureurPromise])
			.then(responses=>{
				if(responses[0].statusCode == 204){
					res.redirect('/courses/connexion');
				}else {
					res.redirect('/courses/connexion');
				}
			})
			.catch(err =>{
				res.redirect('/courses/connexion');
			});
	}else{
		res.redirect('/');
	}

});

router.delete('/supprimer-coureur/:id', function(req, res, next) {

	if(req.session.equipe){

		var request = {method: 'DELETE', uri: serverConfig.server+"/coureur/"+req.params.id, resolveWithFullResponse: true};
		var coureurPromise = rp(request);

		Promise.all([coureurPromise])
			.then(responses=>{
				if(responses[0].statusCode == 204){
					res.status(204).end();
				}else{
					res.status(400);
					res.send({
						"message": "Impossible de supprimer"
					});
				}
			})
			.catch(err =>{
				res.status(400);
				res.send({
					"message": "Impossible de supprimer"
				});
			});

	}else{
		res.redirect('/');
	}

});

router.post('/ajouter-certificat-coureur', function(req, res, next) {

	console.log('Ok');
	if(req.session.equipe){
		var coureur =
			{
				"coureur_certificat_valide": 3,
				"coureur_certificat_fichier": req.session.equipe.equipe_nom,
				"extension": req.files.coureur_certificat_file.name.split('.').pop(),
				"coureur_certificat_buffer": req.files.coureur_certificat_file.data
			};
		var request = {method: 'PUT', uri: serverConfig.server+"/coureur/certificat/"+req.body['coureur_id'], resolveWithFullResponse: true, body: {"coureur": coureur}, json: true};
		var coureurPromise = rp(request);

		Promise.all([coureurPromise])
			.then(responses=>{
				if(responses[0].statusCode == 204){
					res.redirect('/courses/connexion');
				}else {
					res.redirect('/courses/connexion');
				}
			})
			.catch(err =>{
				res.redirect('/courses/connexion');
			});

	}else{
		res.redirect('/');
	}

});

router.get('/connexion', function(req, res, next) {
	if(!req.session.equipe){
		res.render('courses-connexion');
	}else{
		var request1 = {method: 'GET', uri: serverConfig.server+"/coureur/all/equipe/"+req.session.equipe.equipe_id, resolveWithFullResponse: true};
		var request2 = {method: 'GET', uri: serverConfig.server+"/categorie/"+req.session.equipe.equipe_categorie, resolveWithFullResponse: true};
		var coureursPromise = rp(request1);
		var categoriePromise = rp(request2);

		Promise.all([coureursPromise, categoriePromise])
			.then(responses=>{
				if(responses[0].statusCode == 200 && responses[1].statusCode == 200){
					coureurList = JSON.parse(responses[0].body);
					categorie = JSON.parse(responses[1].body);
					if(coureurList != null && coureurList != undefined){
						res.render('courses-mon-espace', { "coureurs": coureurList, "equipe": req.session.equipe, "categorie": categorie });
					}else{
						res.redirect('/');
					}
				}else{
					res.redirect('courses/connexion');
				}

			})
			.catch(err=>{
				res.render('courses-inscriptions-ferme');
			});
	}
});

router.get('/coureur/:id', function(req, res, next) {
	if(!req.session.equipe){
		res.render('courses-connexion');
	}else{
		var request1 = {method: 'GET', uri: serverConfig.server+"/coureur/"+req.params.id, resolveWithFullResponse: true};
		var coureursPromise = rp(request1);

		Promise.all([coureursPromise])
			.then(responses=>{
				if(responses[0].statusCode == 200){
					coureur = JSON.parse(responses[0].body);
					if(coureur != null && coureur != undefined){
						res.status(200);
						res.send(coureur);
					}else{
						res.status(202);
						res.send({"message" :  "Coureur non trouvé"});
					}
				}else{
					res.status(202);
					res.send({"message" :  "Problème pour trouver le coureur"});
				}
			})
			.catch(err=>{
				res.status(202);
				res.send({"message" :  "Problème pour trouver le coureur"});
			});
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
					res.redirect('/courses/connexion');
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

router.get('/course-caritative', function(req, res, next) {
	res.render('courses-caritative');
});

router.get('/parcours', function(req, res, next) {
	res.render('courses-parcours');
});

router.get('/resultats', function(req, res, next) {
	res.render('courses-resultats');
});

module.exports = router;
