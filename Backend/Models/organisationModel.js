const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const organisationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    adminEmail: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Organisation"
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    contactInfo: {
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    website: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    description: String,
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'JobListing',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/diciztr9v/image/upload/v1728748108/profilePic/uha7cvecojok0njvucfu.webp"
    }
});

organisationSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

organisationSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const Organisation = mongoose.model('Organisation', organisationSchema);
module.exports = Organisation;