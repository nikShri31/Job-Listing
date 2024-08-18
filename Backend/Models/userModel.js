const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['employee', 'employer', 'admin'],
        required : true
    },
    //profile may include : experience, short description, skillset, achievements
    profile : {
        type : Map,
        required : true
    },
    conversation : [{
        type : Schema.Types.ObjectId,
        ref : 'Conversation'
    }],
    applications : [{
        type : Schema.Types.ObjectId,
        ref : 'Application'
    }]
})

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password') || user.isNew) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;