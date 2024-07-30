const User = require('../Models/userModel');
const generateToken = require('../utils/jwt');
const expressError = require('../utils/expressError');

exports.login( async (req, res, next) => {
    const {username, password} = req.body;
    const user =  await user.findOne({username});
    if(!user || !(await user.matchPassword(password))){
        next(new expressError(400, 'Invalid Username or Password'));
    }
    const token = generateToken(user);
    res.status(200).json({ status : 'success', token })
})


