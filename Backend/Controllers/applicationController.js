const Application = require('../Models/applicationModel')

//employee
exports.apply = async(req, res, next) => {
    const {jobId, coverLetter, resume} = req.body;
    const userId = req.user.id;
    const application = new Application({job : jobId, applicant : userId, coverLetter, resume});
}