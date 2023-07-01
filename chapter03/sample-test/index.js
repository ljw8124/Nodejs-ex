// Node.js 에서 패키지는 packgage.json 으로 정의한 파일 또는 디렉토리를 의미한다.
// 아래의 것들이 모두 패키지가 될 수 있다.
// 1. package.json 파일이 있는 디렉토리
// 2. 1번을 압축한 파일
// 3. 2번을 내려받을 수 있는 URL 주소
// 4. 3번 정보를 가지고 npm 저장소에 <패키지명>@<버전>으로 등록된 것
// 5. 4번을 가리키는 <패키지명>@<태그>
// 6. <패키지명> 만 있는 경우는 5번에서 latest 태그를 가르킴
// 7. 1번을 결과를 주는 깃 URL

// node_modules 는 실제 존재하지도 않은 경로를 타고 거슬러 올라가면서 node_modules 가 있는지 검사한다.
// 상위 디렉터리에 있는 패키지를 계속 타고 올라가면서 확인하기 때문에 굉장히 많은 I/O 를 수행한다.
// 이것은 require() 가 무거워지는 원인이 되기도 하나, 이 문제를 해결한 yarn 이 있다.

const calc = require("sample-package");

const a = 19;
const b = 3;

console.log('a + b =', calc.add(a, b));
console.log('a - b =', calc.sub(a, b));
console.log('a * b =', calc.multi(a, b));
console.log('a / b =', calc.div(a, b));

// package.json 의존성 정보의 순위
// 1. npm-shrinkwarp.json 2. package-lock.json 3. yarn.lock
// 즉 package-lock.json 과 yarn.lock 둘다 있다면, package-lock.json 이 먼저 사용된다.

// git URL 을 이용하여 npm 설치하는 방법
// $ npm install <git 저장소 주소>
// $ npm install <git 저장소 주소> # 버

// 패키지 업데이트 방법
// $ npm udpate [-g] [패키지명1, 패키지명2, ... 패키지명N]
// $ npm ul
// $ npm upgrade

// package.json 에 의존성 패키지 버전을 적을 때 앞에 ^ 또는 ~ 기호를 쓸 수 있다.
// 또한 의존성 버전 설정에 캐럿(^)을 붙이면 메이저 버전 이외에는 모두 업데이트한다.
// ex. ^1.0.0 은 1.0.0 보다 크거나 같고, 2.0.0 보다 작은 버전을 의미한다.

// 그리고 ~(틸트) 는 현재 지정한 버전의 마지막 자리 내 범위만 자동으로 업데이트한다.
// ex. ~0.0.1 은 0.0.1 보다 크거나 같고 1.1.0 보다는 작은범위를 의미한다.

// 설치한 패키지는 $ npm ls(list, la, ll) 로 확인할 수 있다.
// 위 명령어는 설치한 패키지만 나오고, 설치한 의존성이 의촌하는 패키지로 확인하기 위해서는 --depth 를 추가한다.
// $ npm ls --depth=1

// 이 외에도 더 많은 정보를 주는 long, dependency 항목만 보여주는 prod,
// devDependency 항목만 보여주는 dev, dev 와 prod 값으로 넣을 수 있는 only 가 있다.

// 패키지 삭제
// 패키지 삭제는 uninstall 을 사용한다
// $ npm uninstall [@스코프/] 패키지명[@버전] [-S|--save|-D|--save-dev|-0|--save-optional]
// $ npm remove
// $ npm rm
// $ npm r
// $ npm un
// $ npm unlink

// 스크립트 기능과 NPX
// 스크립트 기능은 앱 시작, 중지, 빌드, 배포, 테스트 등의 명령어를 터미널에 매번 입력하지 않고,
// package.json 에 정의함으로써 조금 더 간편하게 명령어를 실행하는 기능이다.

// package.json scripts 에 명령을 등록하면 npm run ~ 형식으로 호출할 수 있다.
// 스크립트 실행 전과 후에 실행될 스크립트도 지정할 수가 있는데, 이 때 명령어 앞에 pre 또는 post 를 붙이면 된다.
