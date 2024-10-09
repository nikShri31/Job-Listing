import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'Cloud Architect',
  'Mobile App Developer',
  'UX/UI Designer',
  'Product Manager',
  'Database Administrator',
  'Security Analyst',
  'Software Engineer',
  'Technical Support Engineer',
  'System Administrator',
  'Quality Assurance Engineer',
  'Data Analyst',
  'Network Engineer',
  'Site Reliability Engineer',
  'Blockchain Developer',
  'Game Developer',
  'AI Researcher',
  'Embedded Systems Engineer',
  'IT Project Manager',
];

const PRODUCT_COLOR=[];

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

// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/public/images.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 0, max: 0, precision: 0.00 }),
    
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['Remove'])
  };
});
