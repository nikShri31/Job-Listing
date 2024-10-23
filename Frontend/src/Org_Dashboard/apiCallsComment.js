//getOrganisationData :
//need for organisation to be logged in

// await axios.get('localhost:5000/api/organisation', {
//     headers : {
//         Authorization : `Bearer ${localStorage.getItem('token')}`
//     }
// })

//Organisation Dashboard jobs page - get job view data from above api only

//Click on a job - have id in the view only

// await axios.get(`http://localhost:5000/api/job/${jobId}`, {
//     headers : {
//         Authorization : `Bearer ${localStorage.getItem('token')}`
//     }
// })

// Create Job Form Example
// const jobData = {
//     "title" : "Tester6",
//     "description" : "Faltu ka description",
//     "organisation" : OrganisationID   You dont need to write this one i'm handling this at the backend
//     "location" : "Delhi",
//     "salary" : "12",
//     "requirements" : {
//         "experience" : 2,
//         "education" : "Undergraduate",
//         "skills" : ["MERN", "Firebase", "SQL"]
//     },
//     "employmentType" : "Full-Time",
//     "jobType" : "Hybrid"
// }

// employmentType : {
//     type : String,
//     enum : ['Full-Time', 'Part-time'],
//     required : true
// },
// jobType : {
//     type : String,
//     enum : ["On-site", "Remote", "Hybrid"],
//     required : true
// },

// Its API is:

// await axios.post('http://localhost:5000/api/job', jobData, {
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// })

// Make sure it is an organisation that is logged in


//Delete Job - get jobId from job view card

// await axios.delete(`http://localhost:5000/api/job/${jobId}`, {
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// })

// Make sure it is an organisation that is logged in

//Update Status
// Make Sure Organisation Logged In 

//get applicationId from the application which is clicked on
//status  is either "Rejected" or "Accepted"

// const data = await axios.patch("http://localhost:5000/api/application/status/:applicationId", status, {
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// })

//get all applications for a particular organisation
//organisation needs login
// const data = await axios.get("http://localhost:5000/api/organisation/applications", {
//     headers : {
//         Authorization : `Bearer ${localStorage.getItem('token')}`
//     }
// })


//to get all applications of a certain job with all the user data
// const response = await axios.get('/api/application/all/jobId', {header bullshit})