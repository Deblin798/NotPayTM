const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("head", authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    // console.log(token);
    try{
        // console.log("try");
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
    } catch(err){
        // console.log("catch");
        return res.status(403).json({
            message: "Wrong credentials"
        })
    }
}

module.exports = authMiddleware