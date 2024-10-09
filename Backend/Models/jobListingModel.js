const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    requirements : {
        experience : {
            type : Number,
            required : true
        },
        education : {
            type : String,
            required : true
        },
        skills : [{
            type : String,
            required : true
        }]

    },
    location : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    postedDate : {
        type : Date,
        default : Date.now
    },
    organisation : {
        type : Schema.Types.ObjectId,
        ref : 'Organisation',
        required : true
    },
    applications : [{
        type : Schema.Types.ObjectId,
        ref : 'Application'
    }],
    employmentType : {
        type : String,
        enum : ['Full-Time', 'Part-time'],
        required : true
    },
    jobType : {
        type : String,
        enum : ["On-site", "Remote", "Hybrid"],
        required : true
    },
    acceptedCandidates : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]
})

const JobListing = mongoose.model('JobListing', jobListingSchema)
module.exports = JobListing;