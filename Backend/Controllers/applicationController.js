const Application = require('../Models/applicationModel')
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../aws-config')

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'job-docss',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
})

//employee
module.exports.apply =
    [upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetter', maxCount: 1 }]),
    async (req, res, next) => {
        try {
            const { jobId } = req.params;
            const userId = req.user.id;

            if (!req.files || !req.files.resume || !req.files.coverLetter) {
                next(new expressError(400, 'Please upload both resume and cover letter'));
            }

            const resumeUrl = req.files.resume[0].location;
            const coverLetterUrl = req.files.coverLetter[0].location;

            const application = new Application(
                {
                    job: jobId,
                    applicant: userId,
                    coverLetter: coverLetterUrl,
                    resume: resumeUrl
                }
            );
            await application.save();
            res.status(201).json({ message: 'Application submitted successfully', application });
        } catch (error) {
            next(new expressError(400, error.message))
        }
    }];

//employer and employee
module.exports.getApplicationById = async (req, res, next) => {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId).populate('job').populate('applicant');
    res.status(200).json({ application });
}

module.exports.updateStatus = async (req, res, next) => {
    const { applicationId } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
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