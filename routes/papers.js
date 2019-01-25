const express = require("express");
const router = express.Router();
const Paper = require("../models/papers");

// let papersData = [
//     {
//         size:"22x28", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"23x36", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"24x34", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"25x36", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"28x40", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"30x40", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     },
//     {
//         size:"36x46", 
//         gsm:[
//             {thick:"60",qty:"300",totalOrder: "0"},
//             {thick:"70",qty:"300",totalOrder: "0"},
//             {thick:"80",qty:"300",totalOrder: "0"},
//             {thick:"90",qty:"300",totalOrder: "0"},
//             {thick:"100",qty:"300",totalOrder: "0"},
//             {thick:"170",qty:"300",totalOrder: "0"},
//             {thick:"210",qty:"300",totalOrder: "0"},
//             {thick:"240",qty:"300",totalOrder: "0"},
//             {thick:"250",qty:"300",totalOrder: "0"},
//             {thick:"300",qty:"300",totalOrder: "0"},
//             {thick:"350",qty:"300",totalOrder: "0"},
//             {thick:"400",qty:"300",totalOrder: "0"},
//             {thick:"450",qty:"300",totalOrder: "0"},
//         ]
//     }

// ];

// let paperTypes = ["Maplitho", "Hard Paper", "Art Card", "Albaster","Special paper"];

// router.get("/savepapers", (req, res) => {
//     let papers = [];
//     for(let j =0; j< paperTypes.length; j++) {
//         papers.push({paper:paperTypes[j], dimension:[]});
//         for(let i = 0; i < papersData.length; i++) {
//             papers[j].dimension.push(papersData[i]);
//         }        
//     }
//     console.log(papers);

//     Paper.insertMany(papers)
//     .then(res => {
//         res.status(200).json(res);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(501).json(err);
//     }) 
// });


router.get("/", (req, res) => {
    let paper = new Paper();
    Paper.find({"dimension": {size:"24*36"}})
    // .populate('dimension').exec((err, products) => {
    //     if(err) {
    // 	    res.status(400).json({success:false, message:"Jobs not found"});

    //     }
	// 	res.status(200).json(products);

    // })
	.then((pro) => {
        // pro.dimension[5].gsm[2].thick
		res.status(200).json(pro);
	})
	.catch(err => {
		console.log(err)
    	res.status(400).json({success:false, message:"Jobs not found"});
	});
});

module.exports = router;