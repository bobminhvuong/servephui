var userService = require('./../service/user.service');
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    uploadAvatar: uploadAvatar,
    getUserByEmail: getUserByEmail
}
function getUserByEmail(req, res) {
    var email = req.params.email;
    userService.getUserByEmail(email)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.send(err);
        });
};
function uploadAvatar(req, res) {
    var id = req.params.id;
    console.log(id);
    
    if (!req.files)
        res.send({
            message: 'No files were uploaded.'
        });
    let uploadedFile = req.files.file;
    userService.uploadAvatar(id, uploadedFile)
        .then(function (avatar) {
            res.send({
                avatar: avatar
            })
        })
        .catch(function (err) {
            res.send(err);
        });
}
function deleteUser(req, res) {
    var request = {
        id: req.params.id
    }
    userService.deleteUser(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}

function updateUser(req, res) {
    var request = {
        id: req.params.id,
        name: req.body.name
    };
    userService.updateUser(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}
function getUserById(req, res) {
    console.log('đã vào controller');
    
    var id = req.params.id;
    userService.getUserById(id).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}
function getAllUser(req, res) {
    userService.getAllUser().then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err)
    })
}
function createUser(req, res) {
    var request = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birtdate: req.body.birtdate,
    };
    userService.createUser(request).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}