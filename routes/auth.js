
const express = require("express");
const winston = require('../config/winston');
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User =  require("../models/users");

router.post("/register", (req, res) => {
    const {error} = validateUser(req.body);
    if(error){
        winston.error(error.details[0].message);
        return res.status(400).json({"success":false, "message":error.details[0].message});
    }
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  console.log(hashPassword);
  User.create({
    username : req.body.username,
    email : req.body.email,
    password : hashPassword
  },(err, user) => {
    if(err) {
        if(err.code == 11000) {
            winston.error("Email is already registered");
            return res.status(400).json({success:false, message:"Email is already registered"});
        }  
        return res.status(500).json({success:false, message:err});
    }
    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn:1000});

    res.status(200).json({success:true, Token:token});
  });
});



router.get("/me", (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({success: false, message:"No token provided"});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(500).json({success:false, message:"Failed to authenticate token"});
        }
        res.status(200).json({success:true, message:decoded});
    });
});

function validateUser(user){
    console.log(user); 
    const schema =Joi.object().keys( {
        username: Joi.string().min(3).max(250).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    
    return Joi.validate(user, schema);
}
module.exports = router;