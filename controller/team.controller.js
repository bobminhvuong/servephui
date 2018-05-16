var userService = require('./../service/user.service');
var User = require('../models/user.model');
module.exports = {
    createTeam: createTeam,
    getAllTeam: getAllTeam,
    getTeamById: getTeamById,
    updateTeam: updateTeam,
    deleteTeam: deleteTeam
}
function deleteTeam(req, res) {
    var request = {
        id: req.params.id
    }
    TeamService.deleteTeam(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
} 

function updateTeam(req, res) {
    var request = {
        id: req.params.id,
        name: req.body.name,
        img: req.body.lag,
        lag: req.body.lag,
        long: req.body.lag,
        win: req.body.lag,
        los: req.body.lag,
        spam: req.body.lag,
        user: req.body.user
    };
    TeamService.updateTeam(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}
function getTeamById(req, res) {
    var id = req.params.id;
    TeamService.getTeamById(id).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}
function getAllTeam(req, res) {
    TeamService.getAllTeam().then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err)
    })
}
function createTeam(req, res) {
    var request = {
        name: req.body.name,
        img: req.body.img,        
        lag: req.body.lag,
        long: req.body.long,
    };
    TeamService.createTeam(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}