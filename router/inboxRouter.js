//external import
const express = require('express');

//internal import
const { getInbox, searchUser, addConversation, getMessages, sendMessage } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require('../middlewares/common/checkLogin');
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");



const router = express.Router();

//inbox page
router.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox);

//search user for coversation
router.post('/search', checkLogin, searchUser);

//add conversion
router.post('/conversation', checkLogin, addConversation);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);








module.exports = router;