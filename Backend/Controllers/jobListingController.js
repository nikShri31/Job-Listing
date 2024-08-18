const JobListing = require('../Models/jobListingModel');
const Organisation = require('../Models/organisationModel');

//Employer 
exports.createJob = async (req, res, next) => {
    const { title, description, company, location, salary, requirements, organisationId } = req.body;
    const employer = req.user.id;
    const newJob = new JobListing({
        title : title.toLowerCase(),
        description,
        company,
        location : location.toLowerCase(),
        salary,
        employer,
        requirements : {
            experience : requirements.experience.toLowerCase(),
            skills : requirements.skills.map(skill => skill.toLowerCase()),
            education : requirements.education
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
    const { title, description, company, location, salary, requirements } = req.body;
    const job = await JobListing.findByIdAndUpdate(jobId, {
        title,
        description,
        company,
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

exports.getJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobListing.findById(jobId).populate('employer');
    res.status(200).json({ job });
}

exports.getJobsByEmployer = async (req, res, next) => {
    const employer = req.user.id;
    const jobs = await JobListing.find({ employer });
    res.status(200).json({ jobs });
}

exports.getAllJobs = async (req, res, next) => {
    const { title, location, salary, experience, skills } = req.body;
    const filter = {};
    const titleLower = title ? title.toLowerCase() : undefined;
    const locationLower = location ? location.toLowerCase() : undefined;
    const skillsLower = skills ? skills.map(skill => skill.toLowerCase()) : undefined;

    if (title) filter.title = { $regex: new RegExp(title, 'i') };4
    if (location) {
        filter.location = {$in: location.split(', ').map(loc => new RegExp(loc, 'i'))}
    }
    if (salary) filter.salary = { $gte: salary };
    if (experience) filter['requirements.experience'] = { $lte: experience };
    if (skills) {
        const skillArray = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
        filter['requirements.skills'] = { $in: skillArray };
    }

    const jobs = await JobListing.find(filter);
    res.status(200).json({ jobs });
};