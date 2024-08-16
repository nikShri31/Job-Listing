const User = require('../Models/userModel');
const {generateToken} = require('../utils/jwt');
const expressError = require('../utils/expressError');

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username : username });
    if (!user || !(await user.comparePassword(password))) {
        return next(new expressError('Invalid Username or Password', 400));
    }
    const token = generateToken(user);
    res.status(200).json({ status: 'success', token })
}

module.exports.signup = (async (req, res, next) => {
    const { username, password, role, profile } = req.body;
    const user = new User({ username, password, role, profile });
    const createdUser = await user.save();
    const token = generateToken(createdUser);
    res.status(201).json({ status: 'success', message: 'User Created Successfully', token })
})

module.exports.changePassword = async (req, res, next) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    const isMatch = await user.comparePassword(oldPassword);
    if (!user || !isMatch) {
        return next(new expressError('Password entered is incorrect', 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}
