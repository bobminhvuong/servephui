var User = require('./../models/user.model');
var crypto = require('./../utils/crypto');
var message = require('./../utils/message');
var jwt = require('./../utils/jwt');
var path = require('path');
module.exports = {
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    uploadAvatar: uploadAvatar,
    getUserByEmail: getUserByEmail,
    createUser: createUser
}
function uploadAvatar(userId, file) {
    return User.findOne({ _id: userId })
        .then(function (user) {
            if (user) {
                return new Promise(function (resolve, reject) {
                    console.log(123);
                    file.mv(path.join(__dirname, '../public/avatar/avatar_' + user._id + '.png'), function (err) {
                        if (err)
                            reject(err);
                        return User.update({ _id: userId }, { $set: { img: 'avatar_' + user._id + '.png' } })
                            .then(function (data) {
                                resolve({ message: 'ok' });
                            })
                            .then(function (err) {
                                reject(err);
                            })
                    });
                });

            } else {
                return Promise.reject({
                    message: "Not Found",
                    statusCode: 404
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: email
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: err.message
                });
            } else {
                resolve(response);
            }
        });
    })
}
function deleteUser(request) {
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
                    User.remove({
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
function updateUser(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
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
function getUserById(id) {
    console.log('đã vào service');
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
function getAllUser() {
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
function createUser(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: request.email
        }).exec(function (err, userModel) {
            if (err) {
                reject(err);
            } else {
                if (!userModel) {
                    var salt = crypto.genSalt();
                    var newUser = new User({
                        email: request.email,
                        name: request.name,
                        salt: salt,
                        password: crypto.hashWithSalt(request.password, salt),
                        gender: request.gender,
                        birtdate: request.birtdate,
                        modifiDate: new Date(),
                        createdDate: new Date()
                    });
                    newUser.save(function (err, response) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(response);
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
    });
    // return new Promise((resolve, reject) => {
    //     User.findOne({
    //         email: request.email
    //     }).exec(function (err, userModel) {
    //         if (userModel) {
    //             reject({
    //                 statusCode: message.STATUS_CODE.ERROR,
    //                 message: message.ERROR_MESSAGE.USER.EXIST
    //             });
    //         } else {
    //             var salt = crypto.genSalt();
    //             var newUser = new User({
    //                 name: request.name,
    //                 email: request.email,
    //                 salt: salt,
    //                 password: crypto.genRandStr(request.password, salt),
    //                 gender: request.gender,
    //                 birtdate: request.birtdate,
    //                 modifiDate: new Date(),
    //                 createdDate: new Date()
    //             });
    //             newUser.save(function (err, response) {
    //                 if (err) {
    //                     reject({
    //                         message: err.message
    //                     });
    //                 } else {
    //                     resolve(response);
    //                 }
    //             });

    //         }
    //     })
    // });
}