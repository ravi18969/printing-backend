
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
    User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashPassword
    })
    .then(() => {
        // const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn:1000});
        res.status(200).send("You have sucesfully registered");
    })
    .catch(err => {
        if(err.code == 11000) {
            winston.error("Email is already registered");
            return res.status(400).send("Email is already registered")
        }
        return res.status(500).send(err);

    })
});


router.post("/login", (req, res) => {
    
    console.log(req.body);
    User.findOne({email: req.body.email})
    .then(user => {
        let result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) {

            res.status(401).send('Invalid Password')
        } 
        else if(user.status == "active") {
            let payload = {subject: user._id}
            let token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({success:true, message:token})
        }
        else {
            res.status(401).send('You are not an active user. Contact admin to activate your login')
        }
    })
    .catch(err => {
        return res.status(500).send("This email is not registered with us");
    });
});

//   User.create({
//     username : req.body.username,
//     email : req.body.email,
//     password : hashPassword
//   },(err, user) => {
//     if(err) {
//         if(err.code == 11000) {
//             winston.error("Email is already registered");
//             return res.status(400).json({success:false, message:"Email is already registered"});
//         }  
//         return res.status(500).json({success:false, message:err});
//     }
//     const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn:1000});

//     res.status(200).json({success:true, Token:token});
//   });
// });



router.get("/me", verifyToken , (req, res) => {
    res.json("Verified token");
});

function validateUser(user){
    console.log(user); 
    const schema =Joi.object().keys( {
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    
    return Joi.validate(user, schema);
}

function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
    if(!req.headers.authorization) {
      return res.status(401).json({success: false, message:"No token provided"});
    }
    // let token = req.headers.authorization.split(' ')[1]
    let token = req.headers.authorization;

    if(token === 'null') {
        return res.status(401).json({success: false, message:"No token provided"});    
    }
    console.log(req.headers.authorization);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(500).json({success:false, message:"Failed to authenticate token"});
        }
        res.status(200).json({success:true, message:decoded});
    });
    // let payload = jwt.verify(token, 'secretKey')
    // if(!payload) {
    //   return res.status(401).send('Unauthorized request')    
    // }
    req.userId = payload.subject
    next()
  }


  
module.exports = router;