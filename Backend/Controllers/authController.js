const Organisation = require('../Models/organisationModel')
const User = require('../Models/userModel');
const {generateToken} = require('../utils/jwt');
const expressError = require('../utils/expressError');

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email : email });
    if (!user || !(await user.comparePassword(password))) {
        return next(new expressError('Invalid Email or Password', 400));
    }
    const token = generateToken(user);
    res.status(200).json({ status: 'success', token })
}

module.exports.signup = (async (req, res, next) => {
    const { email, password, role, profile, username, name, phoneNo } = req.body;
    const user = new User({ email, password, role, profile, username, name, phoneNo });
    const createdUser = await user.save();
    const token = generateToken(createdUser);
    res.status(201).json({ status: 'success', message: 'User Created Successfully', token })
})

module.exports.orgLogin = async(req, res, next) => {
    const { adminEmail, password } = req.body;
    const org = await Organisation.findOne({ adminEmail });
    if (!org || !(await org.comparePassword(password))) {
        return next(new expressError('Invalid Email or Password', 400));
    }
    const token = generateToken(org);
    res.status(200).json({ status: 'success', token })
}

module.exports.createOrganisation = async(req, res, next) => {
    //address is street, city, state, country, zipCode
    const { name, address, phone, email, website, industry, description, password, adminEmail} = req.body;
    const newOrganisation = new Organisation({
        name,
        adminEmail,
        password,
        address,
        contactInfo: {
            phone : phone,
            email : email
        },
        website,
        industry,
        description
    })
    const org = await newOrganisation.save();
    const token = generateToken(org);
    res.status(201).json({ status: 'success', message: 'Organisation Created Successfully', token})
}

module.exports.changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(oldPassword);
    if (!user || !isMatch) {
        return next(new expressError('Password entered is incorrect', 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}

module.exports.orgChangePassword = async (req, res, next) => {
    const { adminEmail, oldPassword, newPassword } = req.body;
    const org = await Organisation.findOne({ adminEmail });
    const isMatch = await org.comparePassword(oldPassword);
    if (!org || !isMatch) {
        return next(new expressError('Password entered is incorrect', 400));
    }
    org.password = newPassword;
    await org.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}