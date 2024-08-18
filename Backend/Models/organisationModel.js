const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    contactInfo : {
        phone : {
            type : Number,
            required : true
        },
        email : {
            type : String,
            required : true
        }
    },
    website: {
        type: String,
        required : true
    },
    industry: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    employers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'JobListing',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    jobs : [{
        type : Schema.Types.ObjectId,
        ref : 'JobListing'
    }]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;