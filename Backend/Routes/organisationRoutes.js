const router = require('express').Router();
const organisationMethods = require('../Controllers/organisationController')
const { isLogin, isOrganisation, imageUpload } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/applications').get(isLogin(), isOrganisation(), catchAsync(organisationMethods.getAllApplications));

router.route('/uploadProfile').post(isLogin(), isOrganisation(), imageUpload(), catchAsync(organisationMethods.uploadProfilePic))

router.route('/update').patch(isLogin(), isOrganisation(), catchAsync(organisationMethods.updateOrganisation))

router.route('/search').get(isLogin(), catchAsync(organisationMethods.searchOrg));

router.route('/').get(isLogin(), isOrganisation(), catchAsync(organisationMethods.getOrganisation))

module.exports = router;

