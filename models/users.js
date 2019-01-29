var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    firstName: {
        type:String, 
        required: true
    },
    lastName: {
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
    role:{
        type: String,
        default:"user"
    },
    status:{
        type: String,
        default:"inactive"
    },
    created: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);