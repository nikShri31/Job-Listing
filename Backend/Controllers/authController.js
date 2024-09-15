const Organisation = require('../Models/organisationModel')
const User = require('../Models/userModel');
const { generateToken } = require('../utils/jwt');
const expressError = require('../utils/expressError');

//example of userData =
// "userData": {
//     "_id": "66d7524ac6fcd2b40714776f",
//     "name": "Dhruv Agrawal",
//     "username": "dhruv2505",
//     "email": "dhruv2505.dag@gmail.com",
//     "password": "$2a$10$J4WJkoIj4R./ayyjkWYWsub8UveICOz/Sxc3be1xQU6607EatoHZC",
//     "role": "employee",
//     "phoneNo": 9650467338,
//     "profile": {
//         "role": "Web Developer",
//         "experienceData": {
//             "employment": "Working",
//             "employmentType": "FullTime",
//             "experience": "2",
//             "employmentRecord": {
//                 "organisation": "Zidio Developement",
//                 "role": "Intern"
//             },
//             "organisation": "Zidio Developement",
//             "role": "Intern"
//         },
//         "projectData": {
//             "projects": [
//                 {
//                     "title": "Plot Palette",
//                     "progress": "Finished",
//                     "description": "Movie Community",
//                     "role": "Backend Developer"
//                 }
//             ]
//         },
//         "educationData": {
//             "college": "Bharati Vidyapeeth's College of Engineering",
//             "marks": "GPA",
//             "grade": "8.87",
//             "course": "Information Technology"
//         },
//         "skillData": {
//             "skills": [
//                 "JavaScript",
//                 "Node.js",
//                 "NoSQL",
//                 "HTML/CSS",
//                 "SQL",
//                 "React.js"
//             ]
//         },
//         "personalDetails": {
//             "gender": "Male",
//             "maritalStatus": "Single",
//             "category": "General",
//             "language": "",
//             "proficiency": "",
//             "canRead": false,
//             "canWrite": false,
//             "canSpeak": false,
//             "languages": [
//                 {
//                     "language": "English",
//                     "proficiency": "Professional",
//                     "canRead": true,
//                     "canWrite": true,
//                     "canSpeak": true
//                 },
//                 {
//                     "language": "Hindi",
//                     "proficiency": "Professional",
//                     "canRead": true,
//                     "canWrite": true,
//                     "canSpeak": true
//                 }
//             ]
//         }
//     },
//     "applications": [],
//     "notifications": [],
//     "__v": 0,
//     "location": "Delhi, India",
//     "workRole": "Full Stack Developer"
// }
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
        return next(new expressError('Invalid Email or Password', 400));
    }
    const token = generateToken(user);
    const userData = await User.findById(user._id).populate('applications');
    res.status(200).json({ status: 'success', token, userData })
}

module.exports.signup = (async (req, res, next) => {
    const { email, password, profile, username, name, phoneNo, workRole } = req.body;
    const user = new User({ email, password, profile, username, name, phoneNo, workRole });
    user.role = 'employee';
    const createdUser = await user.save();
    const token = generateToken(createdUser);
    res.status(201).json({ status: 'success', message: 'User Created Successfully', token, userData : createdUser })
})

module.exports.orgLogin = async (req, res, next) => {
    const { adminEmail, password } = req.body;
    const org = await Organisation.findOne({ adminEmail });
    if (!org || !(await org.comparePassword(password))) {
        return next(new expressError('Invalid Email or Password', 400));
    }
    const token = generateToken(org);
    const orgData = await Organisation.findById(org._id).populate('jobs');
    res.status(200).json({ status: 'success', token, organisationData : orgData })
}

module.exports.createOrganisation = async (req, res, next) => {
    //address is street, city, state, country, zipCode
    const { name, address, phone, email, website, industry, description, password, adminEmail } = req.body;
    const newOrganisation = new Organisation({
        name,
        adminEmail,
        password,
        address,
        contactInfo: {
            phone: phone,
            email: email
        },
        website,
        industry,
        description
    })
    const org = await newOrganisation.save();
    const token = generateToken(org);
    res.status(201).json({ status: 'success', message: 'Organisation Created Successfully', token, organisationData : org })
}

module.exports.changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(oldPassword);
    if (!user || !isMatch) {
        return next(new expressError('Password entered is incorrect', 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}

module.exports.orgChangePassword = async (req, res, next) => {
    const { adminEmail, oldPassword, newPassword } = req.body;
    const org = await Organisation.findOne({ adminEmail });
    const isMatch = await org.comparePassword(oldPassword);
    if (!org || !isMatch) {
        return next(new expressError('Password entered is incorrect', 400));
    }
    org.password = newPassword;
    await org.save();
    res.status(200).json({ status: 'success', message: 'Password Changed Successfully' })
}