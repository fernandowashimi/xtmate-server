const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            name: String,
            emojiIndex: Number
        }
    ],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;