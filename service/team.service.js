var Team = require('./../models/team.model');
var crypto = require('./../utils/crypto');
var message = require('./../utils/message');
module.exports = {
    createTeam: createTeam,
    getAllTeam: getAllTeam,
    getTeamById: getTeamById,
    updateTeam: updateTeam,
    deleteTeam: deleteTeam
}
function deleteTeam(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: request.id
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: err.message
                });
            } else {
                if (!response) {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.NOT_FOUND
                    })
                } else {
                    Team.remove({
                        _id: request.id
                    }).exec(function (err, response) {
                        if (err) {
                            reject({
                                statusCode: message.STATUS_CODE.NOT_FOUND,
                                message: message.ERROR_MESSAGE.USER.NOT_FOUND
                            });
                        } else {
                            resolve({
                                statusCode: message.STATUS_CODE.SUCCES,
                                message: message.SUCCESS_MESSAGE.USER.DELETED
                            });
                        }
                    });
                }
            }
        });
    });
}
function updateTeam(request) {
    return new Promise((resolve, reject) => {
        Team.findOne({
            _id: request.id
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: message.ERROR_MESSAGE.USER.NOT_FOUND
                });
            } else {
                if (response) {
                    response.name = request.name || response.name;

                    response.save(function (err, response) {
                        if (err) {
                            reject({
                                message: message.ERROR_MESSAGE.USER.NOT_FOUND
                            })
                        } else {
                            resolve(response)
                        }
                    });
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.NOT_FOUND
                    });
                }
            }
        })
    });
}
function getTeamById(id) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: id
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: err.message
                });
            } else {
                if (!response) {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.NOT_FOUND
                    });
                } else {
                    resolve(response)
                }
            }
        });
    });
}
function getAllTeam() {
    return new Promise((resolve, reject) => {
        User.find({}).exec(function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response);
            }
        })
    });
}
function createTeam(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
            name: request.name
        }).exec(function (err, teamModel) {
            if (err) {
                reject(err);
            } else {
                if (!teamModel) {
                    var salt = crypto.genSalt();
                    var newTeam = new Team({
                        name: request.name,
                        img: request.img,
                        lag: request.lag,
                        long: request.long,
                        win: 0,
                        los: 0,
                        rate: 0,
                        spam: 0,
                        modifiDate: new Date(),
                        createdDate: new Date()
                    });
                    newTeam.save(function (err, response) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(response._id);
                        }
                    });
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.EXIST
                    });
                }
            }
        });
    })
}
