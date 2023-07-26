import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {SessionSerializer} from "./session.serializer";
import {LocalStrategy} from "./local.strategy";

@Module({
  imports: [UserModule, PassportModule.register({session: true})],  // default 가 false 이므로 true 로 하여 사용하겠다고 명시
  providers: [AuthService, LocalStrategy, SessionSerializer],               // 사용을 위해서는 등록해야함
  controllers: [AuthController]
})
export class AuthModule {}
