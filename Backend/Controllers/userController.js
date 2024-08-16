const User = require('../Models/userModel');
const expressError = require('../utils/expressError');

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
        next(new expressError('User not found', 400));
    }
    res.status(200).json({ status: 'success', user })
})

exports.searchUser = (async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        next(new expressError('User not found', 400));
    }
    res.status(200).json({ status: 'success', user })
})

exports.updateProfile = (async(req, res, next) => {
    const {profile} = req.body;
    const username = req.user.username;
    const user = await User.findOne({username});
    if(!user){
        next(new expressError('User not found', 400));
    }
    user.profile = profile;
    await user.save();
    res.status(200).json({ status : 'success', message : 'Profile Updated Successfully', profile})
})

//Admin Routes

exports.getAllUsers = (async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ status: 'success', users })
})

