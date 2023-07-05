require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const url = process.env.DB_URI;

// 예제 코드와 다르게 몽고디비 6.0 버전 부터는 자동으로 useNewUrlParser 가 true 로 설정되어있음
const client = new MongoClient(url);

async function main() {
  try{

    // 커넥션을 생성하고 연결 시도
    await client.connect();

    console.log('연결 성공!!');

    const collection = client.db('test').collection('person');  // test 데이터베이스를 사용한다는 의미

    // insert
    // insertOne 할 때는 JSON 형식의 객체를 넣어주면 된다.
    await collection.insertOne({ name: 'joungwoo', age: 28 });

    console.log('삽입 완료');

    // read
    // 문서를 찾을 때는 find 함수를 이용한다.
    // 이 때, 결괏값이 여러개일 수 있으므로 toArray() 를 이용하여 배열로 가져온다.
    const documents = await collection.find({ name: 'joungwoo' }).toArray();

    console.log('찾은문서:', documents);

    // update
    // update 시에는 insert 와 같이 JSON 형식으로 넣어주되, 변경할 부분을 $set 의 값으로 넣어준다.
    await collection.updateOne({ name: 'joungwoo' }, { $set: { age:27 } });

    console.log('문서 업데이트 완료');

    // read
    const updatedDocuments = await collection.find({ name: 'joungwoo' }).toArray();

    console.log('업데이트한 문서:', updatedDocuments);

    // delete
    // await collection.deleteOne({ name: 'joungwoo '});
    // console.log('문서 삭제완료');

    // 연결 종료
    await client.close();

  } catch(err) {
    console.error(err);
  }
}

main();


// 콘솔로 값들을 확인해도 되지만 몽고디비 콤파스를 이용하여 볼 수 도있다.