const jwt = require('jsonwebtoken');

const JWT_SECRETE = 'Samreenisagoodgir@l';

//fetching a user
const user_middleware = (req, res, next)=>{
    const token = req.header("token");         
    if(!token){
        res.status(401).send({error: "please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error: "please authenticate using valid token"});
    }
}

module.exports = user_middleware;