var express = require('express');
var router = express.Router();
var Buffer = require('safe-buffer').Buffer;
var rp = require('request-promise');
var request = require('request');
var serverConfig = require('../config/server')[process.env.NODE_ENV];
var apiConfig = require('../config/api-courses24maker');
var sha256 = require('sha256');
const { base64encode, base64decode } = require('nodejs-base64');

router.get('/inscriptions', function(req, res, next) {
console.log(serverConfig["server-courses-api"])
	if(false){
		res.render('courses-inscriptions-ferme');
	}else{
		var request = {
			method: 'GET',
			uri: serverConfig["server-courses-api"]+"/categories",
			headers: {
				'Authorization': 'Bearer '+apiConfig.jwt_admin
			},
			resolveWithFullResponse: true
		};
		var categoriesPromise = rp(request);

		Promise.all([categoriesPromise])
			.then(responses=>{
				categorieList = JSON.parse(responses[0].body).categories;
				if(categorieList != null && categorieList != undefined){
					res.render('courses-inscriptions', { "categories": categorieList });
				}else{
					res.render('courses-inscriptions-ferme');
				}
			})
			.catch(err=>{
				console.log(err)
				res.render('courses-inscriptions-ferme');
			});

	}

});

router.post('/inscriptions', function(req, res, next) {

	if(req.body.team_password == req.body.team_password2){

		var request = {method: 'POST', uri: serverConfig["server-courses-api"]+"/authentication/register/", resolveWithFullResponse: true,
			body: { team: {team_name: req.body.team_name, team_password: req.body.team_password, team_category_id: req.body.team_category_id},
				team_manager: {participant_name: req.body.participant_name, participant_surname: req.body.participant_surname, participant_birthdate: req.body.participant_birthdate, participant_telephone: req.body.participant_telephone, participant_email: req.body.participant_email} },
			json: true};
		var equipePromise = rp(request);

		Promise.all([equipePromise])
			.then(responses=>{
				if(responses[0].statusCode == 201){
					res.render('courses-connexion', {"messageSucces": "Votre équipe a été créé, vous pouvez vous connecter"});
				}else{
					var message = responses[0].body.message;
					var request = {method: 'GET', uri: serverConfig["server-courses-api"]+"/categories",
						headers: {
							'Authorization': 'Bearer '+apiConfig.jwt_admin
						}, resolveWithFullResponse: true};
					var categoriesPromise = rp(request);

					Promise.all([categoriesPromise])
						.then(responses=>{
							categorieList = JSON.parse(responses[0].body).categories;
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
				if(err.error.errorLabel == 'TEAM_ALREADY_EXISTS'){
					var request = {method: 'GET', uri: serverConfig["server-courses-api"]+"/categories",
						headers: {
							'Authorization': 'Bearer '+apiConfig.jwt_admin
						}, resolveWithFullResponse: true};
					var categoriesPromise = rp(request);
					Promise.all([categoriesPromise])
						.then(responses=>{
							categorieList = JSON.parse(responses[0].body).categories;
							if(categorieList != null && categorieList != undefined){
								res.render('courses-inscriptions', { "categories": categorieList, "messageEchec": "Une équipe avec le même nom existe déjà" });
							}else{
								res.redirect('/courses/inscriptions');
							}
						})
						.catch(err=>{
							res.redirect('/courses/inscriptions');
						});
				}else{
					res.redirect('/courses/inscriptions');
				}
			});
	}else{
		var request = {method: 'GET', uri: serverConfig["server-courses-api"]+"/categories", headers: {
				'Authorization': 'Bearer '+apiConfig.jwt_admin
			}, resolveWithFullResponse: true};
		var categoriesPromise = rp(request);

		Promise.all([categoriesPromise])
			.then(responses=>{
				categorieList = JSON.parse(responses[0].body).categories;
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

	if(req.session.jwt){

		var participant =
		{
			"participant_name": req.body.coureur_prenom,
			"participant_surname": req.body.coureur_nom,
			"participant_student": req.body.coureur_etudiant,
			"participant_birthdate": req.body.coureur_date_naissance,
			"participant_tee_shirt_size": req.body.coureur_taille_tee_shirt,
			"participant_telephone": req.body.coureur_telephone,
			"participant_email": req.body.coureur_email,
			"participant_comment": req.body.coureur_commentaire,
			"participant_team_id": req.session.team_id
		};
		var request = {method: 'POST', uri: serverConfig["server-courses-api"]+"/participants/", headers: {
				'Authorization': 'Bearer '+req.session.jwt
			}, resolveWithFullResponse: true, body: {"participant": participant}, json: true};
		var coureurPromise = rp(request);

		Promise.all([coureurPromise])
			.then(responses=>{
				if(responses[0].statusCode == 201){
					res.redirect('/courses/connexion');
				}else{
					var message = responses[0].body.message;
					var request = {method: 'GET', uri: serverConfig["server-courses-api"]+"/categories", headers: {
							'Authorization': 'Bearer '+req.session.jwt
						}, resolveWithFullResponse: true};
					var categoriesPromise = rp(request);

					Promise.all([categoriesPromise])
						.then(responses=>{
							categorieList = JSON.parse(responses[0].body).categories;
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
		res.redirect('/');
	}

});

router.post('/updater-coureur', function(req, res, next) {

	if(req.session.jwt){

		var participant =
			{
				"participant_name": req.body.coureur_prenom,
				"participant_surname": req.body.coureur_nom,
				"participant_student": req.body.coureur_etudiant,
				"participant_birthdate": req.body.coureur_date_naissance,
				"participant_tee_shirt_size": req.body.coureur_taille_tee_shirt,
				"participant_telephone": req.body.coureur_telephone,
				"participant_email": req.body.coureur_email,
				"participant_comment": req.body.coureur_commentaire,
			};
		var request = {method: 'PUT', uri: serverConfig["server-courses-api"]+"/participants/"+req.body.coureur_id, headers: {
				'Authorization': 'Bearer '+req.session.jwt
			}, resolveWithFullResponse: true, body: {"participant": participant}, json: true};
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

	if(req.session.jwt){

		var request = {method: 'DELETE', uri: serverConfig["server-courses-api"]+"/participants/"+req.params.id, headers: {
				'Authorization': 'Bearer '+req.session.jwt
			}, resolveWithFullResponse: true};
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
	if (req.session.jwt) {
		var encoded = 'data:'+req.files.coureur_certificat_file.mimetype+';base64,'+Buffer.from(req.files.coureur_certificat_file.data).toString('base64');
		var certif = {"participant_medical_certificate": encoded};
		var requestOpt = {method: 'PUT', uri: serverConfig["server-courses-api"]+"/participants/medical-certificate/"+req.body['coureur_id'],
			resolveWithFullResponse: true,
			headers: {
				'Authorization': 'Bearer '+req.session.jwt
			},
			body: {"participant": certif},
			json: true};
		var coureurPromise = rp(requestOpt);

		Promise.all([coureurPromise])
			.then(responses=>{
				if (responses[0].statusCode == 204) {
					res.redirect('/courses/connexion');
				} else {
					res.redirect('/courses/connexion');
				}
			})
			.catch(err =>{
				console.log(err.message)
				res.redirect('/courses/connexion');
			});

	} else {
		res.redirect('/');
	}
});

router.post('/ajouter-carte-va', function(req, res, next) {
	if (req.session.jwt) {
		var encoded = 'data:'+req.files.coureur_carteva_file.mimetype+';base64,'+Buffer.from(req.files.coureur_carteva_file.data).toString('base64');
		var certif = {"participant_student_certificate": encoded};
		var requestOpt = {method: 'PUT', uri: serverConfig["server-courses-api"]+"/participants/student-certificate/"+req.body['coureur_id'],
			resolveWithFullResponse: true,
			headers: {
				'Authorization': 'Bearer '+req.session.jwt
			},
			body: {"participant": certif},
			json: true};
		var coureurPromise = rp(requestOpt);

		Promise.all([coureurPromise])
			.then(responses=>{
				if (responses[0].statusCode == 204) {
					res.redirect('/courses/connexion');
				} else {
					res.redirect('/courses/connexion');
				}
			})
			.catch(err =>{
				console.log(err.message)
				res.redirect('/courses/connexion');
			});

	} else {
		res.redirect('/');
	}
});

router.get('/connexion', function(req, res, next) {
	if (true) {
		res.render('404');
	} else if (!req.session.jwt) {
		res.render('courses-connexion');
	} else {
		var request1 = {method: 'GET', uri: serverConfig["server-courses-api"]+"/teams/"+req.session.team_id+"/?participants=true&category=true&manager=true", resolveWithFullResponse: true,
			headers: {'Authorization': 'Bearer '+req.session.jwt} };
		var request2 = {method: 'GET', uri: serverConfig["server-courses-api"]+"/categories/", resolveWithFullResponse: true,
			headers: {'Authorization': 'Bearer '+req.session.jwt} };
		var teamPromise = rp(request1);
		var categoriesPromise = rp(request2);
		Promise.all([teamPromise, categoriesPromise])
			.then(responses=>{
				if(responses[0].statusCode == 200 && responses[1].statusCode == 200){
					var team = JSON.parse(responses[0].body).team;
					var categories = JSON.parse(responses[1].body).categories;
					var category = categories.filter(el => {
						if(el.category_id == team.team_category_id){
							return el;
						}
					});
					if(team != null && team != undefined){
						res.render('courses-mon-espace', {"team": team, "category": category[0]});
					}else{
						res.redirect('/');
					}
				}else{
					res.render('courses-connexion', {"messageEchec":"Le site est en maintenance. Réessayez plus tard"});
				}

			})
			.catch(err=>{
				res.render('courses-inscriptions-ferme');
			});
	}
});

router.get('/coureur/:id', function(req, res, next) {
	if(!req.session.jwt){
		res.render('courses-connexion');
	}else{
		var request1 = {method: 'GET', uri: serverConfig["server-courses-api"]+"/participants/"+req.params.id, headers: {
				'Authorization': 'Bearer '+req.session.jwt
			}, resolveWithFullResponse: true};
		var coureursPromise = rp(request1);

		Promise.all([coureursPromise])
			.then(responses=>{
				if(responses[0].statusCode == 200){
					coureur = JSON.parse(responses[0].body).participant;
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
	if(!req.session.team_id && !req.session.jwt){
		res.redirect('/');
	}else{
		req.session.destroy();
		res.clearCookie("jwt_courses24maker");
		res.redirect('/');
	}
});

router.post('/connexion', function(req, res, next) {
	var request = {method: 'POST', uri: serverConfig["server-courses-api"]+"/authentication/login/", body: {user: req.body.user, password: req.body.password}, resolveWithFullResponse: true, json: true};
	var equipePromise = rp(request);

	Promise.all([equipePromise])
		.then(responses=>{
			req.session.team_id = responses[0].body.team_id;
			req.session.jwt = responses[0].body.jwt;
			res.cookie("jwt_courses24maker", responses[0].body.jwt);
			res.redirect('connexion');
		})
		.catch(err =>{
			if (err.error.errorLabel == 'AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST') {
				res.render('courses-connexion', {"messageEchec":"L'équipe n'existe pas ou mauvais mot de passe"});
			} else if (err.error.errorLabel == 'AUTHENTICATION_ERROR_PASSWORD_WRONG') {
				res.render('courses-connexion', {"messageEchec":"Mauvais mot de passe"});
			} else {
				res.render('courses-connexion', {"messageEchec":"Le site est en maintenance. Réessayez plus tard ou complétez votre inscription sur place"});
			}
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
