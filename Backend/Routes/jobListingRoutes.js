const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isEmployer} = require('../middleware');
const jobListingController = require('../Controllers/jobListingController');

router.route('/')
.post(isLogin(), isEmployer(), catchAsync(jobListingController.createJob))
.patch(isLogin(), isEmployer(), catchAsync(jobListingController.updateJob))
.delete(isLogin(), isEmployer(), catchAsync(jobListingController.deleteJob))
.get(isLogin(), catchAsync(jobListingController.getJob));

router.route('/created').get(isLogin(), isEmployer(), catchAsync(jobListingController.getJobsByEmployer));

router.route('/getAll').get(isLogin(), catchAsync(jobListingController.getAllJobs))

module.exports = router;