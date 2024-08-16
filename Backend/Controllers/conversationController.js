const Conversation = require('../Models/conversationModel');
const Message = require('../Models/messageModel');
const expressError = require('../utils/expressError');

module.exports.startConversation = async (req, res) => {
    try {
        if (req.user.role === 'employer') {
            const senderId = req.user.id; 
            const {recieverId, message } = req.body;
            const newConversation = new Conversation({
                participants : [senderId, recieverId],
                messages: []
            });
            const savedConversation = await newConversation.save();
            const newMessage = new Message({
                conversation: savedConversation._id,
                sender: senderId,
                recipient: recieverId,
                content: message
            });
            const savedMessage = await newMessage.save();
            savedConversation.messages.push(savedMessage._id);
            await savedConversation.save();
            res.status(200).json(savedConversation);
        } else {
            return next(new expressError("You are not authorized to perform this action", 403));
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.sendMessage = async (req, res, next) => {
    const {conversationId} = req.params;
    const senderId = req.user.id;
    const { message, recieverId } = req.body;
    const newMessage = new Message({
        conversation: conversationId,
        sender: senderId,
        recipient: recieverId,
        content: message
    });
    const savedMessage = await newMessage.save();
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push(savedMessage._id);
    await conversation.save();
    res.status(200).json(savedMessage);
}

module.exports.editMessage = async (req, res, next) => {
    const {messageId} = req.params;
    const { message } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { content: message }, { new: true });
    res.status(200).json(updatedMessage);
}

module.exports.deleteMessage = async (req, res, next) => {
    const { conversationId, messageId } = req.params;
    await Message.findByIdAndDelete(messageId);
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.pull(messageId);
    await conversation.save();
    res.status(200).json({ message: 'Message deleted successfully' });
}

module.exports.getConversation =async (req, res, next) => {
    const {conversationId} = req.params;
    const conversation = await Conversation.findById(conversationId).populate('messages');
    res.status(200).json(conversation);
}

//admin
module.exports.getAllConversations = async (req, res, next) => {
    const conversations = await Conversation.find().populate('messages');
    res.status(200).json(conversations);
}