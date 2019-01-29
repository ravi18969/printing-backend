// const jwt = require("jsonwebtoken");

// let verifyToken = function(req, res, next) {
//     console.log(req.headers.authorization);
//     if(!req.headers.authorization) {
//       return res.status(401).json({success: false, message:"No token provided"});
//     }
    
//     let token = req.headers.authorization;

//     if(token === 'null') {
//         return res.status(401).json({success: false, message:"No token provided"});    
//     }
//     console.log(req.headers.authorization);
//     jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if(err) {
//             return res.status(500).json({success:false, message:"Failed to authenticate token"});
//         }
//         res.status(200).json({success:true, message:decoded});
//     });
//     req.userId = payload.subject
//     next()
// }

// module.exports = verifyToken;