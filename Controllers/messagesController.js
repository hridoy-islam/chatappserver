const Messages = require("../Models/messageModel");
module.exports.addMsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    }
    catch (e) {
        next(e)
    }
}

module.exports.getAllMsg = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const message = await Messages.find({
            users: {$all: [from, to]},
        }).sort({ updatedAt: 1 });

        const projectMessage = message.map((msg)=> {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.json(projectMessage)
    }
    catch (e) {
        next(e)
    }
}