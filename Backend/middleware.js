const jwt = require('jsonwebtoken')
const expressError = require('./utils/expressError')
const s3 = require('./aws-config');
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto = require('crypto');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        key: function (req, file, cb) {
            crypto.randomBytes(32, (err, hash) => {
                if (err) cb(err);
                const fileName = hash.toString('hex') + '-' + file.originalname;
                cb(null, fileName);
            });
        }
    })
})

module.exports.applicationUpload = () => upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }])


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
        if (req.user.role !== "admin") return next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

module.exports.isEmployee = () => {
    return (req, res, next) => {
        if (req.user.role !== "employee") return next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

module.exports.isOrganisation = () => {
    return (req, res, next) => {
        if (req.user.role !== 'Organisation') return next(new expressError('You are not authorized to perform this action', 403));
        next();
    }
}

