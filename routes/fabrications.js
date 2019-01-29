const express = require("express");
const router = express.Router();
const winston = require('../config/winston');
const Joi = require("joi");
const Product =  require("../models/products");
const Fabrication = require("../models/fabrications");


router.post("/saveFabrication", (req, res) => {
	
	let fabrication = new Fabrication(req.body);
	console.log(fabrication);
	Fabrication.findOneAndUpdate({jobId: req.body.jobId}, req.body)
	.then(() => {
		res.status(200).json({success: true, message: 'Fabrication data successfully updated'})
	})
	.catch((err) => {
    	res.status(400).json({success:false, message:err});
	});
	
});

router.get("/getfabricationDetails/:id", (req, res) => {
	let jobId = req.params.id;
	let product;
	Fabrication.find({jobId})
	.then((product) => {
		console.log(product[0]);
		res.status(200).json(product[0]);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})


router.get("/getfabrications", (req, res) => {
	Fabrication.find()
	.then((product) => {
		res.status(200).json(product);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:err});
	});
})

router.get("/getFabricationByDate", (req, res) => {
	console.log(req.query.start);
	Fabrication.find({
		created: {
        	'$gte': new Date(req.query.start),
    		'$lte': new Date(req.query.end)
    	}
	})
	.then((pro) => {
		console.log(pro.length);
		res.status(200).json(pro);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})

router.get("/getfabricationMonthlyBasis", (req, res) => {
	let start = new Date();
	let end = addMonthsUTC(start, -1);
	// let data = start.toISOString().split('T')[0]
	// let end  = start.setMonth( start.getMonth() + 2 )
	// res.send({start: start, end: end.toISOString().split('T')[0]});
	// Fabrication.find()
	Fabrication.find({
		created: {
        	'$gte': new Date(end),
    		'$lte': new Date(start)
    	}
	})
	.then((jobs) => {
		console.log(jobs.length);
		let pendingJobs = jobs.filter(result => {
			return result.workingStatus == 0;
		})

		let delayedJobs = jobs.filter(result => {
			return start > new Date(result.deliveryDate);
		})
		res.status(200).json({totalJobs: jobs.length , pendingJobs: pendingJobs.length, delayedJobs: delayedJobs.length});
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})


function addMonthsUTC (date, count) {
  if (date && count) {
    var m, d = (date = new Date(+date)).getUTCDate()

    date.setUTCMonth(date.getUTCMonth() + count, 1)
    m = date.getUTCMonth()
    date.setUTCDate(d)
    if (date.getUTCMonth() !== m) date.setUTCDate(0)
  }
  return date
}

module.exports = router;