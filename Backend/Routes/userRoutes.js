const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isAdmin, imageUpload } = require('../middleware');
const userMethods = require('../Controllers/userController');

router.route('/search/:username').get(isLogin(), catchAsync(userMethods.searchUser));

router.route('/profile')
    .get(isLogin(), catchAsync(userMethods.getProfile))
    .patch(isLogin(), imageUpload(), catchAsync(userMethods.updateProfile));

router.route('/all').get(isLogin(), isAdmin(), catchAsync(userMethods.getAllUsers));
router.route('/:userId').get(isLogin(), isAdmin(), catchAsync(userMethods.changeRole))

module.exports = router;