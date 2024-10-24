const Application = require('../Models/applicationModel')
const expressError = require('../utils/expressError');
const { getDownloadUrl } = require('../utils/utilityFunctions');
const User = require('../Models/userModel');
const JobListing = require('../Models/jobListingModel');

//Application Apply. Takes in jobId from the params, the resume from the body (multipart form) and return the object with a msg and the application
module.exports.apply = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;

        if (!req.files) {
            return next(new expressError('Please upload resume', 400));
        }

        const jobInfo = await JobListing.findById(jobId).populate('organisation');
        const resume = req.files.resume[0].key;
        // console.log(req.files.resume)
        const application = new Application(
            {
                job: jobId,
                applicant: userId,
                resume: {
                    key: resume
                },
                organisation: jobInfo.organisation
            }
        );
        const newApplication = await application.save();
        const populatedApplication = await Application.findById(newApplication._id).populate('job organisation');
        await JobListing.findByIdAndUpdate(jobId, { $push: { applications: newApplication._id } });
        await User.findByIdAndUpdate(userId, { $push: { applications: newApplication._id } });
        res.status(201).json({ message: 'Application submitted successfully', application: populatedApplication });
    } catch (error) {
        return next(new expressError(error.message, 400))
    }
};

//Shows the application information. Including the user info, the job info and the resume applied. Avaialble to both user and organise. Returns the application
module.exports.getApplicationById = async (req, res, next) => {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId).populate('job applicant');
    const resumeUrl = await getDownloadUrl(application.resume.key);
    application.resume.downloadUrl = resumeUrl;
    const updatedApplication = await application.save();
    res.status(200).json({ ...updatedApplication });
}

module.exports.getAllApplicationsOfUser = async (req, res, next) => {
    const userId = req.user.id;
    const applications = await Application.find({ applicant: userId }).populate('job organisation');
    res.status(200).json({ applications });
}

module.exports.updateStatus = async (req, res, next) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
    const userId = application.applicant;
    const user = await User.findById(userId);

    user.notifications.push({ text: `Your application for ${application.job.title} has been ${status}`, type: "Application", applicationId });
    await user.save();
    
    if (status === "accepted") {
        await JobListing.findByIdAndUpdate(application.job, { $push: { acceptedCandidates: userId }, $pull: { applications: applicationId } });
    } else {
        await JobListing.findByIdAndUpdate(application.job, { $pull: { applications: applicationId } });
    }
    res.status(200).json({ application });
}

module.exports.getApplicationsByJob = async (req, res, next) => {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('applicant');
    res.status(200).json(applications );
}

//admin
module.exports.getAllApplications = async (req, res, next) => {
    const applications = await Application.find().populate('job applicant');
    res.status(200).json({ applications });
}

