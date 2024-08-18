const Organization = require('../Models/organisationModel')
const expressError = require('../utils/expressError');

module.exports.createOrg = async (req, res, next) => {
    try {
        const { name, email, phone, address, website, description, industry } = req.body;
        const newOrg = new Organization({
            name,
            contactInfo : {
                phone,
                email
            },
            address,
            website,
            industry, 
            description
        });
        const savedOrg = await newOrg.save();
        res.status(201).json(savedOrg);
    } catch (error) {
        return next(new expressError(error.message, 500));
    }
};

module.exports.addEmployers = async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const { employerIds } = req.body;
        const org = await Organization.findById(orgId);
        org.employers.push(...employerIds);
        const savedOrg = await org.save();
        res.status(200).json(savedOrg);
    } catch (error) {
        return next(new expressError(error.message, 500));
    }
};