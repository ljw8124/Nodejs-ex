var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 생성 가능한 타입
// String, Number, Date, Buffer, Boolean, Mixed,
// ObjectId(몽고디비에서 고유한 식별자로 사용되는 값), Array, Decimal128(128bit 라는 의미)
// Map, Schema

const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

module.exports = mongoose.model('Person', personSchema);