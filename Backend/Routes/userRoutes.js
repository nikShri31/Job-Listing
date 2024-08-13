const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isAdmin } = require('../middleware');
const userMethods = require('../Controllers/userController');

router.route('/profile')
    .get(isLogin(), catchAsync(userMethods.getProfile))
    .patch(isLogin(), catchAsync(userMethods.updateProfile));

router.route('/all').get(isLogin(), isAdmin(), catchAsync(userMethods.getAllUsers));

router.route('/:id').get(isLogin(), catchAsync(userMethods.searchUser));

module.exports = router;