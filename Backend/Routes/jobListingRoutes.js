const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isOrganisation} = require('../middleware');
const jobListingController = require('../Controllers/jobListingController');

router.route('/').post(isLogin(), isOrganisation(), catchAsync(jobListingController.createJob))

router.route('/getAll').get(isLogin(), catchAsync(jobListingController.getAllJobs))

router.route('/organisation/:organisationId').get(isLogin(), isOrganisation(), catchAsync(jobListingController.getJobsByOrganisation));

router.route('/:jobId')
    .patch(isLogin(), isOrganisation(), catchAsync(jobListingController.updateJob))
    .delete(isLogin(), isOrganisation(), catchAsync(jobListingController.deleteJob))
    .get(isLogin(), catchAsync(jobListingController.getJob));

module.exports = router;