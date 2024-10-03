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
//     "company" : "Testing Company",
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