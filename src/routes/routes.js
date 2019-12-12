const express = require('express');
const routes = express.Router();
const RoundController = require('../controllers/RoundController');
const RoomController = require('../controllers/RoomController');

routes.post('/round', RoundController.store);
routes.delete('/round/:id', RoundController.destroy);
routes.get('/round/:id', RoundController.index);
routes.get('/round/room/:id', RoundController.listInRoom);
//
routes.get('/room/:id', RoomController.index);
routes.put('/room/:id/insert', RoomController.insertUser);
routes.put('/room/:id/remove', RoomController.removeUser);
routes.put('/room/:id/score', RoomController.updateUserScore)

module.exports = routes;