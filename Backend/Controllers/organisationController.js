const Organisation = require('../Models/organisationModel')
const Application  = require('../Models/applicationModel')
const expressError = require('../utils/expressError');
const {uploadToCloudinary} = require('../utils/utilityFunctions');

module.exports.searchOrg = async (req, res, next) => {
    const { name } = req.body;
    const org = await Organisation.findOne({ name });
    if (!org) {
        return next(new expressError('Organisation not found', 400));
    }
    res.status(200).json({ status: 'success', organisationData: org });
}

module.exports.updateOrganisation = async (req, res, next) => {
    const { name, address, phone, email, website, industry, description } = req.body;
    const org = await Organisation.findOne({ name });
    if (!org) {
        return next(new expressError('Organisation not found', 400));
    }
    org.address = address;
    org.phone = phone;
    org.email = email;
    org.website = website;
    org.industry = industry;
    org.description = description;
    await org.save();
    res.status(200).json({ status: 'success', organisationData: org });
}

module.exports.getOrganisation = async (req, res, next) => {
    const name = req.user.name;
    const organisation = await Organisation.findOne({ name }).populate('jobs');
    if (!organisation) {
        return next(new expressError('Organisation not found', 400));
    }
    res.status(200).json({ status: 'success', organisationData: organisation });
}

module.exports.uploadProfilePic = async (req, res, next) => {
    if(!req.file) return next(new expressError(400, 'Please upload a valid file'));

    const org = await Organisation.findOne({ name: req.user.name });
    const result = await uploadToCloudinary(req.file.buffer, req.user.name);
    org.profilePic = result.secure_url;
    const updatedOrganisation = await org.save();

    res.status(200).json({ status: 'success', organisationData: updatedOrganisation });
}

module.exports.getAllApplications = async(req, res, next) => {
    const { organisationId } = req.user.id;
    const applications = await Application.find({ organisation: organisationId }).populate('job applicant');
    res.status(200).json({ applications });
}
