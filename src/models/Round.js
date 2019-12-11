const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    scores: [
        {
            user: String,
            score: Number
        },        
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;