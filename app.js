const express = require('express');
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);
const axios = require("axios");

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes/routes');

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gg2b4.mongodb.net/xtmate?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

io.on('connection', socket => {
    socket.on('user_left', async name => {
        await axios.put('http://localhost:8080/room/5deef9a41c9d44000092d53c/remove', { name });
    });
});

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`App running on port ${port}`);
});