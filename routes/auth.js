
const express = require("express");
const winston = require('../config/winston');
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User =  require("../models/users");
const authController = require('../controllers/auth');


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
        res.status(200).json("You have sucesfully registered");
    })
    .catch(err => {
        if(err.code == 11000) {
            winston.error("Email is already registered");
            return res.status(400).json("Email is already registered")
        }
        return res.status(500).json(err);

    });
});


router.post("/login", (req, res) => {
    
    User.findOne({email: req.body.email})
    .then(user => {
        let result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) {

            res.status(401).send('Invalid Password')
        } 
        else if(user.status == "active") {
            let payload = {subject: user._id}
            let token = jwt.sign(payload, process.env.SECRET)
            
            res.status(200).json({success:true, message:token, role: user.role})
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

router.get("/getUsers", (req, res) => {
    User.find({}, {password:0, created:0, __v:0})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json("Something went wrong")
    })
})

router.post("/changeUserStatus/:id", (req, res) => {
    let userStatus;
    if(req.body.status == 'inactive') {
        userStatus = 'active';
    }
    else {
        userStatus = 'inactive';
    } 
    User.findByIdAndUpdate({_id:req.params.id}, {status: userStatus})
    .then(() => {
        res.status(200).json("User status changed successfully!!");
    })
    .catch(err => {
        res.status(500).json("Something went wrong:", err)
    })
})

router.post("/changeUserRole/:id", (req, res) => {
    let userRole;
    if(req.body.role == 'user') {
        userRole = 'admin';
    }
    else {
        userRole = 'user';
    } 
    User.findByIdAndUpdate({_id:req.params.id}, {role: userRole})
    .then(() => {
        res.status(200).json("User role changed successfully!!");
    })
    .catch(err => {
        res.status(500).json("Something went wrong:", err)
    })
})

router.get("/deleteUser/:id", (req, res) => {
    
    User.findOneAndRemove({_id: req.params.id})
    .then(() => {
        res.status(200).json("User deleted successfully");
    })
    .catch(err => {
        res.status(500).json(err);
    })
    
})


router.get("/me", authController.verifyToken , (req, res) => {
    res.json("Verified token");
});

function validateUser(user){
    const schema =Joi.object().keys( {
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });
    
    return Joi.validate(user, schema);
}

  
module.exports = router;