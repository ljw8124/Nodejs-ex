import common from './common';
import local from "./local";
import dev from "./dev";
import prod from "./prod";

const phase = process.env.NODE_ENV;

// phase 의 값에 따라서 적절한 환경 변숫값을 conf 에 저장
let conf = {};

if(phase === 'local') {
    conf = local;
} else if(phase === 'dev') {
    conf = dev;
} else if(phase === 'prod') {
    conf = prod;
}

export default () => ({
   ...common,
   ...conf,
});


// 서버 기동과 환경 설정 파일 초기화 순
// 1. main.ts 의 bootstrap() 실행
// 2. NestFactory.create() 실행
// 3. 각 모듈 초기화 (ConfigModule 초기화, AppModule 초기화, WeatherModule 초기화)
// 4. 각 모듈 초기화 때, ConfigModule.forRoot() 실행
// 5. 그 후 envFilePath 에서 환경 변수 읽기
// 6. 4 에서 설정한 process.env 를 5와 병합
// 7. 을 load 실행 후의 결괏값과 병합
// 8. 각 컨트롤러 초기화 및 핸들러 함수를 url 에 매핑