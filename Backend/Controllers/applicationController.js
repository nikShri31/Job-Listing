const Application = require('../Models/applicationModel')
const expressError = require('../utils/expressError');
const { getDownloadUrl } = require('../utils/utilityFunctions');
const User = require('../Models/userModel');

//employee
module.exports.apply = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;

        if (!req.files || !req.files.resume || !req.files.coverLetter) {
            return next(new expressError('Please upload both resume and cover letter', 400));
        }

        const resume = req.files.resume[0].key;
        const coverLetter = req.files.coverLetter[0].key;

        const application = new Application(
            {
                job: jobId,
                applicant: userId,
                coverLetter: {
                    key: coverLetter
                },
                resume: {
                    key: resume
                }
            }
        );
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        return next(new expressError(error.message, 400))
    }
};

//employer and employee
module.exports.getApplicationById = async (req, res, next) => {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId).populate('job').populate('applicant');

    const resumeUrl = await getDownloadUrl(application.resume.key);
    const coverLetterUrl = await getDownloadUrl(application.coverLetter.key);

    application.resume.downloadUrl = resumeUrl;
    application.coverLetter.downloadUrl = coverLetterUrl;
    application.save();

    res.status(200).json({ application });
}

module.exports.updateStatus = async (req, res, next) => {
    const { applicationId } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
    const userId = application.applicant;
    const user = await User.findById(userId);
    user.notifications.push({text : `Your application for ${application.job.title} has been ${status}`, type : "Application", applicationId});
    await user.save();
    res.status(200).json({ application });
}

module.exports.getApplicationsByJob = async (req, res, next) => {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('applicant');
    res.status(200).json({ applications });
}

//admin
module.exports.getAllApplications = async (req, res, next) => {
    const applications = await Application.find().populate('job applicant');
    res.status(200).json({ applications });
}