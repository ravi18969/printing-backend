const jwt = require("jsonwebtoken");

exports.verifyToken = function(req, res, next) {
    console.log(req.headers.authorization);
    if(!req.headers.authorization) {
      return res.status(401).json({success: false, message:"No token provided"});
    }
    
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
    req.userId = payload.subject
    next()
}

// module.exports = verifyToken;

// exports.me = function(req,res){
//     if (req.headers && req.headers.authorization) {
//         var authorization = headers.authorization,
//             decoded;
//         try {
//             decoded = jwt.verify(authorization, secret.secretToken);
//         } catch (e) {
//             return res.status(401).send('unauthorized');
//         }
//         var userId = decoded.id;
//         // Fetch the user by id 
//         User.findOne({_id: userId}).then(function(user){
//             return res.send(200);
//         });
//     }
//     return res.send(500);
// }