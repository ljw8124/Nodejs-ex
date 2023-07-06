require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {     // MongoDB 클라이언트 객체 생성
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    await client.connect();               // MongoDB 에 연결
    const adminDB = await client.db("admin")

    // adminDB.command({ ping: 1 });

    const listDatabase = await adminDB.command({listDatabases: 1}); // command 를 이용하여 파리미터로 가져올 정보를 입력

    console.log(listDatabase);

    return "OK";

}

run()
  .then(console.log)
  .catch(console.dir)
  .finally(() => client.close());


// MongoDB 연결을 위해서는 node 에 모듈 설치 필요
// npm i mongodb