var router = require('express').Router();
var userController = require('./../controller/user.controller');
var auth = require('../middle-ware/auth');

module.exports = function () {
    router.get('/', auth.auth(), userController.getAllUser);
    router.get('/:email', userController.getUserByEmail);
    router.get('/:id', userController.getUserById);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);
    router.post('/ava/:id', userController.uploadAvatar);
    router.post('/', userController.createUser);
    return router;
}