const User = require("../Models/userModel");
const bcrypt = require('bcrypt')

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });  
        if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false })
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (e) {
        next(e)
    }

}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        if (userCheck)
            return res.json({ msg: "Username already used", status: false })
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (e) {
        next(e);
    }
}

module.exports.allusers = async (req, res, next) => {
    try{
        const users = await User.find({ "_id": { "$ne": req.params.id }}).select([
            "email",
            "username",
            "_id"
        ])
        return res.json(users)
    }   
    catch (e) {
        next(e);
    }
}

module.exports.logout = async(req, res, next) => {
    try{
        
    }
    catch (e) {
        next(e);
    }
}