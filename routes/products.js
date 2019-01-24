const express = require("express");
const router = express.Router();
const winston = require('../config/winston');
const Joi = require("joi");
const Product =  require("../models/products");
const Fabrication = require("../models/fabrications");



router.post("/create-requirement", (req, res) => {
	// console.log(req.body);
	
	let product = new Product(req.body);
	let fabrication = new Fabrication({jobId: req.body.jobId, deliveryDate: req.body.expectedDeliveryDate});

	console.log(product);
	// res.send(product);
	product.save()
    .then(() => {
    	fabrication.save();
      	res.status(200).json({success: true, message: 'Job created successfully'});
    })
    .catch(err => {
    	console.log(err);
    	res.status(400).json({success:false, message:err});
    });
});

router.get("/listAllProducts", (req, res) => {
	Product.find()
	.then((pro) => {
		res.status(200).json(pro);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})

router.get("/listproduct/:id", (req, res) => {
	let jobId = req.params.id;
	let product;
	Product.find({jobId})
	.then((product) => {
		console.log(product[0]);
		res.status(200).json(product[0]);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})

router.post("/updateProduct/:id", (req, res) => {
	let id = req.params.id;
	console.log(req.body);
	Product.findOneAndUpdate({_id:id}, req.body)
	.then(() => {
		res.status(200).json({success:true, message:"Product updated"});
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})
module.exports = router;