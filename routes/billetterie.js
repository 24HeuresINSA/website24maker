var express = require('express');
var router = express.Router();
var cleweezevent = require('../config/api-weezevent');
const request = require('request');

router.get('/', function(req, res, next) {
	res.render('billetterie');
});

router.get('/reglement', function(req, res, next) {
	res.render('billetterie');
});

router.get('/stats', function (req, res, next) {
	//res.status(500).end();
	request(cleweezevent.cle, (err, resr, body) => {
		if (err) {
			res.status(500);
			res.send({
				"error": err
			});
		} else if(JSON.parse(resr.body).events != undefined) {
			var vendredi = 0;
			var samedi = 0;
			var deuxsoirs = 138;
			var deuxsoirs_early = 0;
			var deuxsoirs_regular = 0;
			var deuxsoirs_regular_sell = 0;
			var deuxsoirs_last = 0;
			var vendredi_early = 0;
			var vendredi_regular = 0;
			var vendredi_regular_sell = 0;
			var vendredi_last = 0;
			var samedi_early = 0;
			var samedi_regular = 0;
			var samedi_regular_sell = 0;
			var samedi_last = 0;
			var quotas_deuxsoirs = 138;
			var quotas_deuxsoirs_early = 0;
			var quotas_deuxsoirs_regular = 0;
			var quotas_deuxsoirs_regular_sell = 0;
			var quotas_deuxsoirs_last = 0;
			var quotas_vendredi_early = 0;
			var quotas_vendredi_regular = 0;
			var quotas_vendredi_regular_sell = 0;
			var quotas_vendredi_last = 0;
			var quotas_samedi_early = 0;
			var quotas_samedi_regular = 0;
			var quotas_samedi_regular_sell = 0;
			var quotas_samedi_last = 0;

			var result = JSON.parse(resr.body);
			var categories = result.events[0].categories;
			var tickets = result.events[0].tickets;

			categories.forEach(elem => {
				elem.tickets.forEach(el => {
					tickets.push(el);
				});
			});

			tickets.forEach(elem => {
				//2S early "2129361"
				if (["2129356"].includes(elem.id)) {
					quotas_deuxsoirs += elem.quotas;
					quotas_deuxsoirs_early += elem.quotas;
					deuxsoirs += elem.participants;
					vendredi += elem.participants;
					samedi += elem.participants;
					deuxsoirs_early += elem.participants;
				//2S regular in sell
				} else if (["2129348"].includes(elem.id)) {
					quotas_deuxsoirs_regular += elem.quotas;
					quotas_deuxsoirs_regular_sell += elem.quotas;
					quotas_deuxsoirs += elem.quotas;
					deuxsoirs += elem.participants;
					vendredi += elem.participants;
					samedi += elem.participants;
					deuxsoirs_regular += elem.participants;
					deuxsoirs_regular_sell += elem.participants
				//2S regular
				} else if (["2129352", "2129347", "2129360"].includes(elem.id)) {
					quotas_deuxsoirs += elem.quotas;
					quotas_deuxsoirs_regular += elem.quotas;
					deuxsoirs += elem.participants;
					vendredi += elem.participants;
					samedi += elem.participants;
					deuxsoirs_regular += elem.participants;
				//2S last
				} else if (["2129367"].includes(elem.id)) {
					quotas_deuxsoirs += elem.quotas;
					quotas_deuxsoirs_last += elem.quotas;
					deuxsoirs += elem.participants;
					vendredi += elem.participants;
					samedi += elem.participants;
					deuxsoirs_last += elem.participants;
				//VEN early
				} else if (["2129362"].includes(elem.id)) {
					vendredi += elem.participants;
					vendredi_early += elem.participants;
					quotas_vendredi_early += elem.quotas;
				//VEN regular in sell
				} else if (["2129349"].includes(elem.id)) {
					vendredi_regular_sell += elem.participants;
					vendredi += elem.participants;
					vendredi_regular += elem.participants;
					quotas_vendredi_regular += elem.quotas;
					quotas_vendredi_regular_sell += elem.quotas;
				//VEN regular
				} else if (["2129353", "2129345", "2129371"].includes(elem.id)) {
					vendredi += elem.participants;
					vendredi_regular += elem.participants;
					quotas_vendredi_regular += elem.quotas;
				//VEN last
				} else if (["2129368"].includes(elem.id)) {
					vendredi += elem.participants;
					vendredi_last += elem.participants;
					quotas_vendredi_last += elem.quotas;
				//SAM early
				} else if (["2129363"].includes(elem.id)) {
					samedi += elem.participants;
					samedi_early += elem.participants;
					quotas_samedi_early += elem.quotas;
				//SAM regular in sell
				} else if (["2129350"].includes(elem.id)) {
					samedi += elem.participants;
					samedi_regular += elem.participants;
					samedi_regular_sell += elem.participants;
					quotas_samedi_regular += elem.quotas;
					quotas_samedi_regular_sell += elem.quotas;
				//SAM regular
				} else if (["2129354", "2129346", "2129370"].includes(elem.id)) {
					samedi += elem.participants;
					samedi_regular += elem.participants;
					quotas_samedi_regular += elem.quotas;
				//SAM last
				} else if (["2129369"].includes(elem.id)) {
					samedi += elem.participants;
					samedi_last += elem.participants;
					quotas_samedi_last += elem.quotas;
				}
			});

			if (new Date(Date.now()) > new Date(2020,1,2,18)) {
				deuxsoirs_early = 700;
			}

			/*var deadline = new Date(2020, 05, 07,22,20,00);
			var debut = new Date(2020,02,02,12,00,00);
			var now = Date.now();
			var totaldate = deadline - debut;
			var restantdate = deadline - now;*/
			var avancement = 0// 100-((restantdate/totaldate)*100).toFixed(1);

			res.send({
				"vendredi": (vendredi/10000*100).toFixed(1),
				"samedi": (samedi/10000*100).toFixed(1),
				"deuxsoirs": (deuxsoirs/quotas_deuxsoirs*100).toFixed(1),
				"deuxsoirs_early": (deuxsoirs_early/quotas_deuxsoirs_early*100).toFixed(1),
				"deuxsoirs_regular": Math.max((deuxsoirs_regular/quotas_deuxsoirs_regular*100).toFixed(1), avancement),
				"deuxsoirs_regular_sell": Math.max((deuxsoirs_regular_sell/quotas_deuxsoirs_regular_sell*100).toFixed(1), avancement),
				"deuxsoirs_last": (deuxsoirs_last/quotas_deuxsoirs_last*100).toFixed(1),
				"vendredi_early": (vendredi_early/quotas_vendredi_early*100).toFixed(1),
				"vendredi_regular": Math.max((vendredi_regular/quotas_vendredi_regular*100).toFixed(1), avancement),
				"vendredi_regular_sell": Math.max((vendredi_regular_sell/quotas_vendredi_regular_sell*100).toFixed(1), avancement),
				"vendredi_last": (vendredi_last/quotas_vendredi_last*100).toFixed(1),
				"samedi_early": (samedi_early/quotas_samedi_early*100).toFixed(1),
				"samedi_regular": Math.max((samedi_regular/quotas_samedi_regular*100).toFixed(1), avancement),
				"samedi_regular_sell": Math.max((samedi_regular_sell/quotas_samedi_regular_sell*100).toFixed(1), avancement),
				"samedi_last": (samedi_last/quotas_samedi_last*100).toFixed(1)
			});
		} else {
			res.status(500);
			res.send({"error": "problem to get stats"});
		}
	});

});

router.get('/stats-mock', function (req, res, next) {

	res.send({
		"vendredi": 12.7,
		"samedi": 23.6,
		"deuxsoirs": 55.0,
		"deuxsoirs_early": 10,
		"deuxsoirs_regular": 20,
		"deuxsoirs_last": 30,
		"vendredi_early": 30,
		"vendredi_regular": 100,
		"vendredi_last": 30,
		"samedi_early": 99.6,
		"samedi_regular": 21,
		"samedi_last": 21
	});

});

router.get('/stats-null', function (req, res, next) {

	res.send({
		"vendredi": 0,
		"samedi": 0,
		"deuxsoirs": 0,
		"deuxsoirs_early": 0,
		"deuxsoirs_regular": 0,
		"deuxsoirs_last": 0,
		"vendredi_early": 0,
		"vendredi_regular": 0,
		"vendredi_last": 0,
		"samedi_early": 0,
		"samedi_regular": 0,
		"samedi_last": 0
	});

});

module.exports = router;
