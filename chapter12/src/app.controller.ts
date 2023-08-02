import {Bind, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import { AppService } from './app.service';
import {Express} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file')) // 파일 인터셉터
  @Bind(UploadedFile)
  fileUpload(file) {
    console.log(file);

    console.log(file.buffer.toString('utf-8'));
    return "File Upload";
  }

}
