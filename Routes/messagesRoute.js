const { addMsg, getAllMsg } = require("../Controllers/messagesController");
const router = require("express").Router();

router.post('/addmsg', addMsg);
router.post('/getallmsg', getAllMsg);


module.exports = router;