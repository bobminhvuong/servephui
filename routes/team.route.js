var router = require('express').Router();
var userController = require('./../controller/team.controller');

module.exports = function () {
    router.post('/', teamController.createTeam);
    router.get('/', teamController.getAllTeam);
    router.get('/:id', teamController.getTeamById);
    router.put('/:id', teamController.updateTeam);
    router.delete('/:id', teamController.deleteTeam);
    return router;
}