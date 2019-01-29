const express = require("express");
const router = express.Router();
const winston = require('../config/winston');
const Joi = require("joi");
const Product =  require("../models/products");
const Fabrication = require("../models/fabrications");
const Paper = require("../models/papers");


router.post("/create-requirement", (req, res) => {
	
	let product = new Product(req.body);
	let fabrication = new Fabrication({jobId: req.body.jobId, vendor: req.body.vendor, deliveryDate: req.body.expectedDeliveryDate});
	console.log(product);
	Paper.findOneAndUpdate({ paper: req.body.paperType }, { $inc: { totalOrder: req.body.plates } }, { new: true })
    .then(() => {
        console.log("Updated successfully!!");
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({success:false, message:"Jobs not found"});
    });

	// Save product and fabrication details
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
		console.log(pro);
		res.status(200).json(pro);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
})

router.get("/getProductByDate", (req, res) => {
	console.log(req.params.start)
	res.send(req.body);
	// Product.find({
	// 	created: {
    //     	'$gte': new Date("2019-01-20T15:37:59.240Z"),
    // '$lte': new Date("2019-01-29T15:37:59.240Z")
    // 	}
	// })
	// .then((pro) => {
	// 	console.log(pro.length);
	// 	res.status(200).json(pro);
	// })
	// .catch(err => {
	// 	console.log(err)
    // 	res.status(400).json({success:false, message:"Jobs not found"});
	// });
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

router.post("/remove/:id", (req, res) => {
	console.log(req.body)
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
        console.log(err)
        res.status(400).json({success:false, message:"Jobs not found"});
    });

})
module.exports = router;