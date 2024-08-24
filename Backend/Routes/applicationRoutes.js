const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isEmployee, isOrganisation, isAdmin } = require('../middleware');
const applicationMethods = require('../Controllers/applicationController');
const {applicationUpload} = require('../middleware')

router.route('/apply/:jobId').post(isLogin(), isEmployee(), applicationUpload(), catchAsync(applicationMethods.apply));
router.route('/status/:applicationId').patch(isLogin(), isOrganisation(), catchAsync(applicationMethods.updateStatus));
router.route('/all/:jobId').get(isLogin(), isOrganisation(), catchAsync(applicationMethods.getApplicationsByJob));
router.route('/:applicationId').get(isLogin(), catchAsync(applicationMethods.getApplicationById));
router.route('/').get(isLogin(), isAdmin(), catchAsync(applicationMethods.getAllApplications));

module.exports = router;