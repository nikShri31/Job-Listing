const User = require('../Models/userModel');
const generateToken = require('../utils/jwt');
const expressError = require('../utils/expressError');

exports.login(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await user.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
        next(new expressError(400, 'Invalid Username or Password'));
    }
    const token = generateToken(user);
    res.status(200).json({ status: 'success', token })
})

exports.signup = (async (req, res, next) => {
    const { username, password, role, } = req.body;
    const user = new User({ username, password, role, profile });
    await user.save();
    res.status(201).json({ status: 'success', message: 'User Created Successfully' })
})

exports.changePassword = (async (req, res, next) => {
    const { username, oldpassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(oldpassword))) {
        next(new expressError(400, 'Invalid Username or Password'));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
})

//Employee Routes

exports.getProfile = (async (req, res, next) => {
    const username = req.user.username;
    const user = await User.findOne({ username }).populate({
        path : 'conversation',
        populate : {
            path : 'messages'
        }  
    }).populate('applications');
    if (!user) {
        next(new expressError(400, 'User not found'));
    }
    res.status(200).json({ status: 'success', user })
})

exports.searchUser = (async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        next(new expressError(400, 'User not found'));
    }
    res.status(200).json({ status: 'success', user })
})

exports.updateProfile = (async(req, res, next) => {
    const username = req.user.username;
    const user = await User.findOne({username});
    if(!user){
        next(new expressError(400, 'User not found'));
    }
    user.profile = profile;
    await user.save();
    res.status(200).json({ status : 'success', message : 'Profile Updated Successfully' })
})

//Admin Routes

exports.getAllUsers = (async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ status: 'success', users })
})

