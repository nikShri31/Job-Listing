const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const { isLogin, isEmployer, isAdmin } = require('../middleware');
const conversationMethods = require("../Controllers/conversationController")

router.route('/').get(isLogin(), isAdmin(), catchAsync(conversationMethods.getAllConversations));

router.route('/start').post(isLogin(), isEmployer(), catchAsync(conversationMethods.startConversation));

router.route('/msg/:conversationId')
.post(isLogin(), catchAsync(conversationMethods.sendMessage))
.patch(isLogin(), catchAsync(conversationMethods.editMessage))
.delete(isLogin(), catchAsync(conversationMethods.deleteMessage));

module.exports = router;