const User = require('../Models/userModel');
const {generateToken} = require('../utils/jwt');
const expressError = require('../utils/expressError');

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        next(new expressError(400, 'Invalid Username or Password'));
    }
    const token = generateToken(user);
    res.status(200).json({ status: 'success', token })
}

module.exports.signup = (async (req, res, next) => {
    const { userName, password, role, profile } = req.body;
    const user = new User({ userName, password, role, profile });
    const createdUser = await user.save();
    const token = generateToken(createdUser);
    res.status(201).json({ status: 'success', message: 'User Created Successfully', token })
})

module.exports.changePassword = async (req, res, next) => {
    const { username, oldpassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(oldpassword))) {
        next(new expressError(400, 'Invalid Username or Password'));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}
