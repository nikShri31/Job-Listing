const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }],
    messages : [{
        type : Schema.Types.ObjectId,
        ref : 'Message',
        required : true
    }],
    lastUpdated : {
        type : Date,
        default : Date.now
    }
})

const Conversation = mongoose.Model('Conversation', conversationSchema);
module.exports = Conversation;