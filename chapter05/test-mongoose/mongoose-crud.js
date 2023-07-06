require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person-model');

mongoose.set('strictQuery', false);   // 이 설정을 해줘야 경고문이 뜨지 않음

const app = express();

app.use(bodyParser.json());           // 미들웨어 설정. HTTP 에서 body 를 파싱하기 위한 설정

app.listen(3000, async() => {
  console.log('Server started!!');

  const mongodbUri = process.env.DB_URI

  // mongoose 가 MongoDB 와 연결을 위해서는 connect() 를 사용한다.
  mongoose.connect(mongodbUri).then(console.log("Connected to MongoDB"));
});

// 모든 person 데이터 가져오기
// 이 경우에 에러가 나는 경우가 있어서 위에서 set strictQuery 설정을 한것이다.
// 가져올 때 옵션을 추가할 수 있는데,
// sort: 1은 오름차순, -1은 내림차순으로 데이터를 정렬한다.
// limit: 결과 문서 수를 지정한다
// skip: 결과 문서 중 앞에서 제외할 문서 수를 지정한다
app.get("/person", async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email }); // 특정 email 주소로 person 가져오기
  res.send(person);
});

// person 데이터 추가
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();              // save() 를 호출하여 DB 에 저장
  // await person.create(req.body); // save() 와 같이 동작함
  res.send(person);
});

// person 데이터 수정하기
app.put("/person/:email", async (req, res) => {
  // updateOne() 가 같이 동작하지만, option 부분이 조금 다르고, 결괏값이 문서가 아니라 update 동작의 결괏값이 나오는 부분이 다르다.
  const person = await Person.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body},
      { new: true },
  );
  console.log("update completed... =>", person);
  res.send(person)
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
