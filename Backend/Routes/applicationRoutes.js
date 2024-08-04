const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isEmployee, isEmployer, isAdmin } = require('../middleware');
const applicationMethods = require('../Controllers/applicationController');

router.route('/').get(isLogin(), isAdmin(), catchAsync(applicationMethods.getAllApplications));
router.route('/:applicationId').get(isLogin(), catchAsync(applicationMethods.getApplicationById));
router.route('/apply/:jobId').post(isLogin(), isEmployee(), catchAsync(applicationMethods.apply));
router.route('/status/:applicationId').patch(isLogin(), isEmployer(), catchAsync(applicationMethods.updateStatus));
router.route('/all/:jobId').get(isLogin(), isEmployer(), catchAsync(applicationMethods.getApplicationsByJob));

module.exports = router;