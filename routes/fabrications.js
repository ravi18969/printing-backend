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

module.exports = router;