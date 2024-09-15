const Organisation = require('../Models/organisationModel')
const expressError = require('../utils/expressError');

module.exports.searchOrg = async(req,res,next) => {
    const {name} = req.body;
    const org = await Organization.findOne({name});
    if(!org){
        return next(new expressError('Organisation not found', 400));
    }
    res.status(200).json({status: 'success', organisationData : org});
}

module.exports.updateOrganisation = async(req, res, next) => {
    const {name, address, phone, email, website, industry, description} = req.body;
    const org = await Organisation.findOne({name});
    if(!org){
        return next(new expressError('Organisation not found', 400));
    }
    org.address = address;
    org.phone = phone;
    org.email = email;
    org.website = website;
    org.industry = industry;
    org.description = description;
    await org.save();
    res.status(200).json({status: 'success', organisationData : org});
}

module.exports.getOrganisation = async(req, res, next) => {
    const name = req.user.name;
    const organisation = await Organisation.findOne({ name }).populate('jobs');
    if(!org) {
        return next(new expressError('Organisation not found', 400));
    }
    res.status(200).json({status: 'success', organisationData : organisation});
}