import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from "./configs/config";

console.log('env: ', process.env.NODE_ENV);
console.log(process.cwd());

@Module({
  // forRoot() 는 동적 모듈을 한 번 구성하고 해당 구서을 여러 위치에서 재사용 하는 것이다 -> 전역에서 사용하도록 수정
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,      // process.cwd() 는 지금 디렉터리 경로를 가르킴
    load: [config],   // 커스텀 설정 파일 설정
    expandVariables: true, // 확장 변수 옵션 추가
  }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ConfigModule.forRoot() 함수 옵션
// - cache: 메모리 환경 변수를 캐시할지 여부 -> 성능 개선 목적
// - isGlobal: true 이면 global module 로 등록되어, 다른 모듈에서 임포트를 따로 해주지 않아도 된다.
// - ignoreEnvFile: true 이면 .env 파일이 무시된다.
// - ignoreEnvVars: true 이면 환경 변수가 무효가 된다.
// - envFilePath: 환경 변수 파일(들)의 경로
// - encoding: 환경 변수 파일의 인코딩
// - validate: 환경 변수의 유효성 검증 함수
// - load: 커스텀 환경 설정 파일을 로딩 시에 사용합니다(ts file, YAML file ...etc)