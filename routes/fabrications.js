const express = require("express");
const router = express.Router();
// const winston = require('../config/winston');
// const Joi = require("joi");
const Product =  require("../models/products");
const Fabrication = require("../models/fabrications");
const Paper = require("../models/papers");
const authController = require('../controllers/auth');


router.post("/saveFabrication", authController.verifyToken, (req, res) => {
	
	if(req.body.workingStatus == 11) {
		Product.findOneAndUpdate({jobId:req.body.jobId}, {workingStatus: 11})
		.then(() => {
			console.log("Status updated!!");
		})
		.catch(err => {
			console.log(err)
		});

		Product.find({jobId:req.body.jobId})
		.then((job) => {
			Paper.findOneAndUpdate({paper: job[0].paperType}, {$inc: {quantity:-job[0].plates, totalOrder: -job[0].plates}})
			.then(() => {
				console.log("Paper updated");
			})
			.catch(err => {
				console.log("Error form Paper:", err);
			})
		})
		.catch(err => {
			console.log("Error form Jobs:", err);
		});
	}
	
	let fabrication = new Fabrication(req.body);
	Fabrication.findOneAndUpdate({jobId: req.body.jobId}, req.body)
	.then(() => {
		res.status(200).json({success: true, message: 'Fabrication data successfully updated'})
	})
	.catch((err) => {
    	res.status(400).json({success:false, message:err});
	});
	
});

router.get("/getfabricationDetails/:id", authController.verifyToken, (req, res) => {
	let jobId = req.params.id;
	let product;
	Fabrication.find({jobId})
	.then((product) => {
		res.status(200).json(product[0]);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})


router.get("/getfabrications", authController.verifyToken, (req, res) => {
	Fabrication.find().sort({created:-1})
	.then((product) => {
		res.status(200).json(product);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:err});
	});
})

router.get("/getFabricationByDate", authController.verifyToken, (req, res) => {
	Fabrication.find({
		created: {
        	'$gte': new Date(req.query.start),
    		'$lte': new Date(req.query.end)
    	}
	})
	.then((jobs) => {
		let pendingJobs = jobs.filter(result => {
			return result.workingStatus == 0;
		})

		let completedJobs = jobs.filter(result => {
			return result.workingStatus == 11;
		})

		let delayedJobs = jobs.filter(result => {
			return req.query.start > new Date(result.deliveryDate);
		})
		res.status(200).json({
			totalJobs: jobs.length, 
			pendingJobs: pendingJobs.length, 
			delayedJobs: delayedJobs.length, 
			completedJobs: completedJobs.length,
			jobs:jobs
		})
	})
	.catch(err => {
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})

router.get("/getfabricationMonthlyBasis", authController.verifyToken, (req, res) => {
	let start = new Date();
	let end = addMonthsUTC(start, -1);
	Fabrication.find({
		created: {
        	'$gte': new Date(end),
    		'$lte': new Date(start)
    	}
	})
	.then((jobs) => {
		let pendingJobs = jobs.filter(result => {
			return result.workingStatus == 0;
		})

		let completedJobs = jobs.filter(result => {
			return result.workingStatus == 11;
		})

		let delayedJobs = jobs.filter(result => {
			return start > new Date(result.deliveryDate);
		})
		res.status(200).json({
			totalJobs: jobs.length, 
			pendingJobs: pendingJobs.length, 
			delayedJobs: delayedJobs.length, 
			completedJobs: completedJobs.length
		})
	})
	.catch(err => {
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