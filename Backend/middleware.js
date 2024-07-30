const jwt = require('jsonwebtoken')
const isLogin = () => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ status: 'fail', message: 'You are not logged in' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            next(new expressError(401, 'Invalid Token'));
        }
    }
}

const isAdmin = () => {
    return (req, res, next) => {
        if (req.user.role !== 'admin') return res.status(403).json({ status: 'fail', message: 'You are not authorized to perform this action' });
        next();
    }
}

const isEmployee = () => {
    return (req, res, next) => {
        if (req.user.role !== 'employee') return res.status(403).json({ status: 'fail', message: 'You are not authorized to perform this action' });
        next();
    }
}

const isEmployer = () => {
    return (req, res, next) => {
        if (req.user.role !== 'employer') return res.status(403).json({ status: 'fail', message: 'You are not authorized to perform this action' });
        next();
    }
}

exports = {isLogin, isAdmin, isEmployee, isEmployer};