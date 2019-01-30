var mongoose = require("mongoose");
// paperTypes = ["Maplitho", "Hard Paper", "Art Card", "Albaster","Special paper"];
// paperSizes = ["22x28", "23x36", "24x34", "25x36", "28x40", "30x40", "36x46"];
//   gsms = [60, 70, 80, 90, 100, 170, 210, 240, 250, 300, 350, 400, 450];

// var dimensionSchema = mongoose.Schema({
//     size:String,
//     gsm:[{thick:String,qty:String,totalOrder: String}]
// });


var paperSchema = mongoose.Schema({
    paper: String,
    quantity:Number,
    totalOrder:Number,
 
});

module.exports = mongoose.model('Papers', paperSchema);
