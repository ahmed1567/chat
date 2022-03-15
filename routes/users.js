var express = require('express');
var router = express.Router();
const chatController=require('../controllers/chatController')

router.get('/chat', chatController.chat); 



router.get('/chat_box',chatController.chat_box ) ;







module.exports = router;