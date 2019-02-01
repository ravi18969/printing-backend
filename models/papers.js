var mongoose = require("mongoose");

var paperSchema = mongoose.Schema({
    paper: String,
    quantity:Number,
    totalOrder:Number,
 
});

module.exports = mongoose.model('Papers', paperSchema);
