const jwt = require('jsonwebtoken');
const JWT_SECRETE = 'Samreenisagoodgir@l';

//fetching a admin
const admin_middleware = (req, res, next)=>{
    const token = req.header("token");         
    if(!token){
        res.status(401).send({error: "please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.admin = data.admin;
        next();

    } catch (error) {
        res.status(401).send({error: "please authenticate using valid token"});
    }
}

module.exports = admin_middleware;