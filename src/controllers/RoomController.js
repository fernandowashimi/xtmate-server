const Room = require('../models/Room');

const insertUser = async (req, res) => {
    try {
        req.body.emojiIndex = Math.floor(Math.random() * 38);
        const room = await Room.findByIdAndUpdate(req.params.id, { $push: { users: req.body } }, { new: true });
        req.io.sockets.emit("user_connection", req.body);
        res.send(room);
    } catch(error) {
        res.status(500).send(error);
    }
}

const removeUser = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, { $pull: { users: req.body } }, { new: true });
        req.io.sockets.emit("user_disconnection", req.body);
        res.send(room);
    } catch(error) {
        res.status(500).send(error);
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

module.exports = { insertUser, removeUser, index };