var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var entity
var teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    lag: {
        type: Number
    },
    long: {
        type: Number
    },
    win: {
        type: Number
    },
    los: {
        type: Number
    },
    rate: {
        type: Number
    },
    spam: {
        type: Number
    },
    user: [{
        idUser: String,
        position: String
    }],
    modifiDate: {
        type: Date
    },
    createDate: {
        type: Date
    }

});
var Team = mongoose.model('team', teamSchema);
module.exports = Team;