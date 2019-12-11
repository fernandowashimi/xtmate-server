const Round = require('../models/Round');

const store = async (req, res) => {
    try {
        const round = await Round.create(req.body);
        res.send(round);
    } catch(error) {
        res.status(500).send(error);
    }
};

const destroy = async (req, res) => {
    try {
        const round = await Round.findByIdAndDelete(req.params.id);
        res.send(round);
    } catch(error) {
        res.status(500).send(error);
    }
}

const index = async (req, res) => {
    try {
        const round = await Round.findById(req.params.id);
        res.send(round);
    } catch(error) {
        res.status(500).send(error);
    }
}

const listInRoom = async (req, res) => {
    try {
        const rounds = await Round.find({ room: req.params.id }).sort({ createdAt: 'desc' });
        res.send(rounds);
    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = { store, destroy, index, listInRoom };