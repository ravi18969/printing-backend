var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {
        type:String, 
        required: true
    },
    email: {
        type:String,
        unique:true,    
        required: true
    },
    password:{
        type: String,
        required:true
    },
    created: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);