const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin } = require('../middleware');
const authMethods = require('../Controllers/authController');

router.route('/login').post(catchAsync(authMethods.login));
router.route('/signup').post(catchAsync(authMethods.signup));
router.route('/changepassword').patch(isLogin(), catchAsync(authMethods.changePassword));
router.route('/organisation/signup').post(catchAsync(authMethods.createOrganisation));
router.route('/organisation/login').post(catchAsync(authMethods.orgLogin));
router.route('/organisation/changePassword').patch(isLogin(), catchAsync(authMethods.orgChangePassword));

module.exports = router;