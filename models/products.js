var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    jobId: {
        type:String, 
        required: true
    },
    vendor: {
        type:String, 
        required: true
    },
    paperType: {
        type:String, 
        required: true
    },
    specialPaper: String,
    gsm: {
        type:String, 
        required: true
    },
    paperSize: {
        type:String, 
        required: true
    },
    printMode: {
        type:String, 
        required: true
    },
    plates: {
        type:String, 
        required: true
    },
    plateType: {
        type:String, 
        required: true
    },
    rimWeight: {
        type:String, 
        required: true
    },
    unitPrice: {
        type:String, 
        required: true
    },
    expectedDeliveryDate:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    created: {
        type:Date,
        default:Date.now()
    },
    workingStatus: { type: Number, default: 0 },
    description: String
});

module.exports = mongoose.model("Product", productSchema);