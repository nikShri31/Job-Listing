const jwt = require('jsonwebtoken')

const generateToken = (user) =>{
    const payload = {
        id : user._id,
        username : user.userName,
        role : user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1h'});
}

module.exports = {generateToken}