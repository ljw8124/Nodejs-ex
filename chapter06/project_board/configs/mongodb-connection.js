require("dotenv").config();

const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI;

// 함수 사용하는 사람이 uri 를 몰라도 호출할 수 있도록 함수로 만들어줌
module.exports = function(callback) {
  return MongoClient.connect(uri, callback);
}
