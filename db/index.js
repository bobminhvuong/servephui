var config = require('./../config').mongodb;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connect_mongo = mongoose.connect('mongodb://' + config.host + '/' + config.database, function (err, db) {
    useMongoClient: true
});
module.exports = connect_mongo;