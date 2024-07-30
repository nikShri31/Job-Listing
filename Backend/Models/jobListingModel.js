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
            type : String,
            required : true
        },
        education : {
            type : String,
            required : true
        },
        skills : {
            type : String,
            required : true
        }
    },
    location : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    postedDate : {
        type : Date,
        default : Date.now
    },
    employer : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
})

const JobListing = mongoose.Model('JobListing', jobListingSchema)
module.exports = JobListing;