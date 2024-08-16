const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin } = require('../middleware');
const authMethods = require('../Controllers/authController');

router.route('/login').post(catchAsync(authMethods.login));
router.route('/signup').post(catchAsync(authMethods.signup));
router.route('/changepassword').post(isLogin(), catchAsync(authMethods.changePassword));

module.exports = router;