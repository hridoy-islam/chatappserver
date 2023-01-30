const { login, register, allusers } = require("../Controllers/userController");
const router = require("express").Router();

router.post('/login', login);
router.post('/register', register);
router.get('/allusers/:id', allusers);


module.exports = router;