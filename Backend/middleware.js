const jwt = require('jsonwebtoken')
const expressError = require('./utils/expressError')

module.exports.isLogin = () => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ status: 'fail', message: 'You are not logged in' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ status: 'fail', message: 'Invalid Token' });
        }
    }
}

module.exports.isAdmin = () => {
    return (req, res, next) => {
        if (req.user.role !== 'admin') next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

module.exports.isEmployee = () => {
    return (req, res, next) => {
        if (req.user.role !== 'employee') next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

module.exports.isEmployer = () => {
    return (req, res, next) => {
        if (req.user.role !== 'employer') next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

