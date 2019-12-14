const Room = require('../models/Room');

const insertUser = async (req, res) => {
    try {
        if (req.body.name.toLowerCase() === 'gustavo') {
            req.body.emojiIndex = 12;
        } else {
            req.body.emojiIndex = Math.floor(Math.random() * 38);
        }
        const room = await Room.findByIdAndUpdate(req.params.id, { $push: { users: req.body } }, { new: true, useFindAndModify: false });
        req.io.sockets.emit("user_connection", room.users.slice(-1)[0]);
        res.send(room);
    } catch(error) {
        res.status(500).send(error);
    }
}

const removeUser = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, { $pull: { users: req.body } }, { new: false, useFindAndModify: false });
        req.io.sockets.emit("user_disconnection", req.body);
        res.send(room);
    } catch(error) {
        res.status(500).send(error);
    }
}

const updateUserScore = async (req, res) => {
    try {
        const room = await Room.updateOne({ _id: req.params.id, "users._id": req.body._id }, { $set: { "users.$.score": req.body.score } });
        req.io.sockets.emit("user_score", room);
        res.send(room);
    } catch(error) {
        res.status(500).send(error)
    }
}

const index = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.send(room);
    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = { insertUser, removeUser,updateUserScore, index };