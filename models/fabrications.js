var mongoose = require("mongoose");

var fabricationSchema = mongoose.Schema({
    jobId: {
        type:String, 
        required: true
    },
    laminationType: {
        type:String, 
        default:""
    },
    laminationDate: {
        type:String, 
        default:""
    },
    laminationStatus: {
        type:String, 
        default:""
    },
    laminationDelayReason: {
        type:String, 
        default:""
    },
    punchingDate: {
        type:String, 
        default:""
    },
    punchingStatus: {
        type:String,
        default:"" 
    },
    punchingDelayReason: {
        type:String, 
        default:""
    },
    uvType: {
        type:String,
        default:"" 
    },
    uvDate: {
        type:String,
        default:"" 
    },
    uvStatus: {
        type:String,
        default:"" 
    },
    uvDelayReason: {
        type:String,
        default:"" 
    },
    foilingType: {
        type:String,
        default:"" 
    },
    foilingDate: {
        type:String,
        default:"" 
    },
    foilingStatus: {
        type:String,
        default:"" 
    },
    foilingDelayReason: {
        type:String,
        default:"" 
    },
    foldingDate: {
        type:String,
        default:"" 
    },
    foldingStatus: {
        type:String,
        default:"" 
    },
    foldingDelayReason: {
        type:String,
        default:"" 
    },
    pinningDate: {
        type:String,
        default:"" 
    },
    pinningStatus: {
        type:String,
        default:"" 
    },
    pinningDelayReason: {
        type:String,
        default:"" 
    },
    stitchingDate: {
        type:String,
        default:"" 
    },
    stitchingStatus: {
        type:String,
        default:"" 
    },
    stitchingDelayReason: {
        type:String,
        default:"" 
    },
    bindingDate: {
        type:String,
        default:"" 
    },
    bindingStatus: {
        type:String,
        default:"" 
    },
    bindingDelayReason: {
        type:String,
        default:"" 
    },
    pastingDate: {
        type:String,
        default:"" 
    },
    pastingStatus: {
        type:String,
        default:"" 
    },
    pastingDelayReason: {
        type:String,
        default:"" 
    },
    cuttingDate: {
        type:String,
        default:"" 
    },
    cuttingStatus: {
        type:String,
        default:"" 
    },
    cuttingDelayReason: {
        type:String,
        default:"" 
    },
    deliveryDate: {
        type:String,
        required: true
    },
    created: {
        type:Date,
        default:Date.now()
    }

});

module.exports = mongoose.model("Fabrication", fabricationSchema);
