# MongoDB(NoSQL 기반)

### 기본 용어

- 테이블: 특정 주제에 대한 행과 열로 이루어진 데이터의 모음
- 로우(행): 관계형 데이터베이스의 테이블에서 단일 구조 데이터 항목을 의미함.</br>
  레코드라고도 불림
- 컬럼(열): 관계형 데이터베이스의 테이블에서 특정한 자료의 값 혹은 테이블에서의 열을 의미함
- 기본키(Primary Key): 중복된 값을 가질 수 없다. 데이터 식별을 위해 필요한 키
- 외래키(Foreign Key): 두 테이블을 연결하는데 사용하는 키
- RDB(관계형 데이터베이스): 모든 데이터를 2차원의 테이블에 저장한다.</br>
  서로 다른 테이블 간에 조인 혹은 외래키로 관계를 맺을 수 있다.
- 스키마(schema): 데이터베이스 테이블의 명세를 기술한 데이터
- 모델(model): 데이터베이스의 특정 테이블과 테이블에 있는 컬럼들의 형태를 정의한 클래스
- 컬렉션(collection): 몽고디비에서 사용하는 용어로, 도큐먼트의 집합을 컬렉션이라고 한다.</br>
  관계형 데이터베이스의 테이블과 동일한 의미로 사용된다.
- 조인(join): 두 개 이상의 테이블 또는 컬렉션을 조합하여 데이터를 보여주는 기법
- 트랜잭션(transaction: 데이터 변경을 수행하는 작업 단위
- 클러스터(cluster): 데이터 처리량을 높일 목적으로 데이터를 여러 서버(샤드)에 저장하는 기법
- 샤드(shard): 큰 데이터베이스를 작은 단위로 분할하는 기능이다.</br>
  샤드를 이용하여 데이터를 작은 단위로 분할하여 노드(데이터를 가지고 있는 서버)에 분산시켜서 저장할 수 있다.</br>
  => 대규모 데이터베이스를 다루는 시스템에서 성능과 확장성을 향상시킬 수 있다.


## MongoDB
몽고디비에서 문서는 BSON 형식의 데이터 포맷이다. BSON 은 'Binary JSON' 의 의미로 JSON 을 바이너리 형식으로 저장하는 형태이다.

또한 기존 JSON 에서는 지원하지 않는 자료형인 Date 와 BinData(바이너리데이터) 타입을 지원한다.

바이너리로 저장하기 때문에 용량이 문자열보다 작고 성능 또한 좋다.


### MongoDB 연산자
- $set: 도큐먼트의 속성값을 변경할 때 사용
- $unset: 도큐먼트 속성을 삭제할 때 사용
- $rename: 도큐먼트의 속성의 이름을 변경할 때 사용
- $inc: 필드의 값을 증가시킬 때 사용
- $mul: 필드의 값에 곱하기를 할 때 사용
- $min: 지정한 값과 현재값 중 작은 값을 선택
- $max: 지정한 값과 현재값 중 큰 값을 선택
- $currentDate: 현재 날짜와 시간을 필드에 업데이트
- $addToSet: 배열 필드가 아직 없는 경우 해당 필드에 값을 추가
- $pop: 배열 필드에서 첫 번째 혹은 마지막 값을 삭제
- $pull: 배열 필드에서 모든 값을 삭제
- $push: 배열 필드의 끝에 값을 추가
- $each: 여러 개의 값을 추가해 배열 필드를 수정

### Mongoose
성능이 중요하다면 네이티브 MongoDB 를 쓰는게 좋지 그 외에는 편리한 기능을 제공하는 Mongoose 를 사용하는 것이 좋다