const JobListing = require('../Models/jobListingModel');
const Organisation = require('../Models/organisationModel');
const User = require('../Models/userModel');

//Employer 
exports.createJob = async (req, res, next) => {
    const { title, description, company, location, salary, requirements } = req.body;
    const organisationId = req.user.id;
    const newJob = new JobListing({
        title: title.toLowerCase(),
        description,
        company,
        location: location.toLowerCase(),
        salary,
        organisation: organisationId,
        requirements: {
            experience: requirements.experience,
            skills: requirements.skills.map(skill => skill.toLowerCase()),
            education: requirements.education
        },
    });
    await newJob.save();
    const organisation = await Organisation.findById(organisationId);
    organisation.jobs.push(newJob._id);
    await organisation.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
}

exports.updateJob = async (req, res, next) => {
    const { jobId } = req.params;
    const { title, description, organisation, location, salary, requirements } = req.body;
    const job = await JobListing.findByIdAndUpdate(jobId, {
        title,
        description,
        organisation,
        location,
        salary,
        requirements
    }, { new: true });
    res.status(200).json({ message: 'Job updated successfully', job });
}

exports.deleteJob = async (req, res, next) => {
    const { jobId } = req.params;
    await JobListing.findByIdAndDelete(jobId);
    const organisation = await Organisation.findOne({ jobs: jobId });
    organisation.jobs.pull(jobId);
    await organisation.save();
    res.status(200).json({ message: 'Job deleted successfully' });
}

//employer select 1 job
exports.getJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobListing.findById(jobId).populate('organisation').populate('applications');
    res.status(200).json({ job });
}

exports.getJobsByOrganisation = async (req, res, next) => {
    const { organisationId } = req.params;
    const jobs = await JobListing.find({ organisation: organisationId });
    res.status(200).json({ jobs });
}

exports.getAllJobs = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('applications');
        const appliedJobs = new Set(user.applications.map(ele => ele.job.toString()));
        const jobs = await JobListing.find().populate('organisation');
        const jobArray = jobs.filter(job => !appliedJobs.has(job._id.toString()));
        res.send({ msg: "Jobs sent successfully", jobs: jobArray });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
