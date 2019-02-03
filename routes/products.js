const express = require("express");
const router = express.Router();
// const winston = require('../config/winston');
// const Joi = require("joi");
const Product =  require("../models/products");
const Fabrication = require("../models/fabrications");
const Paper = require("../models/papers");
const authController = require('../controllers/auth');



router.post("/create-requirement", authController.verifyToken, (req, res) => {
	
	let product = new Product(req.body);
	let fabrication = new Fabrication({jobId: req.body.jobId, vendor: req.body.vendor, deliveryDate: req.body.expectedDeliveryDate});
	
	Paper.findOneAndUpdate({ paper: req.body.paperType }, { $inc: { totalOrder: req.body.plates } }, { new: true })
    .then((res) => {
    	console.log(res);
        console.log("Updated successfully!!");
    })
    .catch(err => {
        res.status(400).json({success:false, message:"Jobs not found"});
    });

	// Save product and fabrication details
	product.save()
    .then(() => {
    	fabrication.save();
      	res.status(200).json({success: true, message: 'Job created successfully'});
    })
    .catch(err => {
    	res.status(400).json({success:false, message:err});
    });
});



router.get("/listAllProducts", authController.verifyToken, (req, res) => {
	Product.find().sort({created:-1})
	.then((pro) => {
		res.status(200).json(pro);
	})
	.catch(err => {
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})

router.get("/listproduct/:id", authController.verifyToken, (req, res) => {
	// console.log(req.headers);
	let jobId = req.params.id;
	Product.find({jobId})
	.then((product) => {
		res.status(200).json(product[0]);
	})
	.catch(err => {
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})

router.post("/updateProduct/:id", authController.verifyToken, (req, res) => {
	let id = req.params.id;
	let paperCount = req.body.papersToAdd;
	delete req.body.papersToAdd;
	Product.findOneAndUpdate({_id:id}, req.body)
	.then(() => {
		Paper.findOneAndUpdate({ paper: req.body.paperType }, { $inc: { totalOrder: paperCount } }, { new: true })
		.then(() => {
			res.status(200).json({success:true, message:"Product updated"});

		})
		.catch(err => {
			console.log(err)
		});
	})
	.catch(err => {
    	res.status(400).json({success:false, message:"Job Id not found"});
	});
})

router.post("/remove/:id", authController.verifyToken, (req, res) => {
    Product.findOneAndRemove({jobId: req.params.id}, function(err, product){
    if(err) res.json(err);
    	else {
    		Fabrication.findOneAndRemove({jobId: req.params.id}, function(err, product) {
    			if(err) res.json(err);
    			else res.json('Successfully removed');

    		});
    	}
    });

    Paper.findOneAndUpdate({ paper: req.body.paper }, { $inc: { totalOrder: -req.body.count } }, { new: true })
    .then(() => {
        console.log("Updated successfully!!");
    })
    .catch(err => {
        res.status(400).json({success:false, message:"Jobs not found"});
    });

})


module.exports = router;