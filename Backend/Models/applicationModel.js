const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    job: {
      type: Schema.Types.ObjectId,
      ref: 'JobListing',
      required: true
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    coverLetter: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    status : {
      type : String,
      enum : ['pending', 'accepted', 'rejected'],
      default : 'pending'
    }
  });

  const Application = mongoose.model('Application', ApplicationSchema);
  module.exports = Application;
  