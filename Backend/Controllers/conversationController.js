const Conversation = require('../Models/conversationModel');
const Message = require('../Models/messageModel');

exports.startConversation = async (req, res) => {
    try {
        if (req.user.role === 'employer') {
            const { senderId, recieverId, message } = req.body;
            const newConversation = new Conversation({
                participants: [senderId, recieverId],
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
            res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.sendMessage = async (req, res, next) => {
    const {conversationId} = req.params;
    const { message, senderId, recieverId } = req.body;
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

exports.editMessage = async (req, res, next) => {
    const { messageId, message } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { content: message }, { new: true });
    res.status(200).json(updatedMessage);
}

exports.deleteMessage = async (req, res, next) => {
    const { conversationId, messageId } = req.params;
    await Message.findByIdAndDelete(messageId);
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.pull(messageId);
    await conversation.save();
    res.status(200).json({ message: 'Message deleted successfully' });
}

//admin
exports.getAllConversations = async (req, res, next) => {
    const conversations = await Conversation.find().populate('messages');
    res.status(200).json(conversations);
}