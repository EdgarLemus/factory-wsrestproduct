/* eslint-disable no-console */
/* eslint-disable callback-return */
let config = require('../config/Env');

let mongoClient = require('mongodb').MongoClient;
//let url = "mongodb+srv://"+config.mongoDBUser+":"+config.mongoDBPass+"@"+config.mongoDBHost+"/test?retryWrites=true";
let url = "mongodb://" + config.mongoDBHost + ":" + config.mongoDBPort + "/" + config.mongoDB;
console.log(url)
let client = new mongoClient(url, { useNewUrlParser: true });

exports.GetCollection = function (collection, cb) {
  mongoClient.connect(url, function (err, db) {
    if (err) cb(err, null);
    try {
      var dbo = db.db("sophos_store");
      if (err) cb(err, null);
      dbo.collection(collection).find().toArray(function (err, result) {
        if (err) cb(err, null);
        cb(err, result);
        db.close();
      });
    } catch (err) {
      cb(err, null);
    }
  });
};

exports.GetCollectionFilter = function (collection, filter, cb) {
  mongoClient.connect(url, function (err, db) {
    if (err) cb(err, null);
    try {
      var dbo = db.db("sophos_store");
      if (err) cb(err, null);
      dbo.collection(collection).find(filter).toArray(function (err, result) {
        if (err) cb(err, null);
        cb(err, result);
        db.close();
      });
    } catch (err) {
      cb(err, null);
    }
  });
};
