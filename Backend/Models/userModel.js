const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        required: true
    },
    phoneNo :{
        type : Number,
        required : true
    },
    workRole : String,
    profile: {
        type: Map,
        required: true
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    location : String,
    notifications: [{
        text: {
            type: String,
            required: true
        },
        applicationId: {
            type: String,
            required: true
        },
        timeStamp: {
            type: Date,
            default: Date.now
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;