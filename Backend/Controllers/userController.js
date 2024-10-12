const User = require('../Models/userModel');
const expressError = require('../utils/expressError');
const { uploadToCloudinary } = require('../utils/utilityFunctions');

//Employee Routes
exports.getProfile = (async (req, res, next) => {
    const username = req.user.username;
    const user = await User.findOne({ username }).populate('applications');
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
    const {profilePic} = req.file;
    const {location, phoneNo, workRole, profile} = req.body;

    const username = req.user.username;
    if(!username) return next(new expressError('Please login to continue', 400));
    
    const user = await User.findOne({username});
    if(!user) return next(new expressError('User not found', 400));
    
    if(profile) user.profile = profile;
    if(location) user.location = location;
    if(workRole) user.workRole = workRole;
    if(phoneNo) user.phoneNo = phoneNo;
    if(profilePic){
        const result = await uploadToCloudinary(profilePic.buffer, username)
        user.profilePic = result.secure_url;
    }

    const updatedUser = await user.save();
    res.status(200).json({ status : 'success', message : 'Profile Updated Successfully', updatedUser})
})

//Admin Routes
exports.getAllUsers = (async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ status: 'success', users })
})

exports.changeRole = async(req,res,next) => {
    const {userId} = req.params;
    const user = await User.findById(userId);
    user.role = 'admin';
    await user.save();
    res.status(200).json({ status : 'success', message : 'Role Updated Successfully', user})
}