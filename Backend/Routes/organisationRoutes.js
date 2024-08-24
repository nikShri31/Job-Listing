const router = require('express').Router();
const organisationMethods = require('../Controllers/organisationController')
const { isLogin, isOrganisation } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/').get(isLogin(),isOrganisation(), catchAsync(organisationMethods.getOrganisation))

router.route('/update').patch(isLogin(), isOrganisation(), catchAsync(organisationMethods.updateOrganisation))

router.route('/search').get(isLogin(), catchAsync(organisationMethods.searchOrg));

module.exports = router;

