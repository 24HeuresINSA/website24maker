var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var send = require('gmail-send')({
	user: 'communication@24heures.org',
	pass: 'poneyroti24h'
});

var iii=0;

router.get('/bars-restauration', function(req, res, next) {
	res.render('infos-bars');
});

router.get('/contact', function(req, res, next) {
	res.render('infos-contact');
});

router.post('/contact', function(req, res, next) {

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	var to = req.body.to;

	if(iii==0) {
		send({
			to: to,
			from: email,
			replyTo: {name: name, address: email},
			subject: '[Message du site 24heures.org] >> ' + subject,
			text: '>>>> Expediteur du message: ' + name + ' | ' + email + '\n>>>>En répondant à ce message, vous répondrez directement à ' + name + '\n\n>>>>Message\n' + message
		}, function (err, info) {
			console.log('COUCOU');
			if (err) {
				console.log(err);
				res.status(500).end();
			} else {
				console.log('Email sent: ' + info.response);
				res.status(200).end();
				iii=1;
				setTimeout(function(){
					iii=0;
				}, 3000);

			}
		});
	}

/*
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'communication@24heures.org',
			pass: 'poneyroti24h'
		}
	});

	var mailOptions = {
		from: email,
		replyTo : {name: name, adress: email},
		to: to,
		subject: '[Message du site internet] >> '+subject,
		text: 'Expediteur du message: '+name+' <<<\n\n'+message
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			res.status(500).end();
		} else {
			console.log('Email sent: ' + info.response);
			res.status(200).end();
		}
	});

	transporter.close();

	*/

});

router.get('/faq', function(req, res, next) {
	res.render('infos-faq');
});

router.get('/transports', function(req, res, next) {
	res.render('infos-transports');
});

module.exports = router;
