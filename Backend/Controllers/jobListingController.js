const JobListing = require('../Models/jobListingModel');

//Employer 
exports.createJob = async (req, res, next) => {
    const { title, description, company, location, salary, requirements } = req.body;
    const employer = req.user._id;
    const newJob = new JobListing({
        title,
        description,
        company,
        location,
        salary,
        employer,
        requirements,
        employer : req.user._id
    });
    await newJob.save();
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
    res.status(200).json({ message: 'Job deleted successfully' });
}

exports.getJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobListing.findById(jobId).populate('employer');
    res.status(200).json({ job });
}

exports.getJobsByEmployer = async (req, res, next) => {
    const employer = req.user._id;
    const jobs = await JobListing.find({ employer });
    res.status(200).json({ jobs });
}

exports.getAllJobs = async (req, res, next) => {
    const { title, location, salary, experience, skills } = req.body;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (salary) filter.salary = { $gte: salary };
    if (experience || skills){
        const requirements = {};
        if(requirements.experience) filter['requirements.experience'] = { $lte: requirements.experience };
        if(requirements.skills) filter['requirements.skills'] = { $in : requirements.skills.split(',')};
    }
    const jobs = await JobListing.find(filter);
    res.status(200).json({ jobs });
}