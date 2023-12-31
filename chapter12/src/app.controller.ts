import { AppService } from './app.service';
import {Controller, Get, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "./multer.options";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOptions)) // 파일 인터셉터
  fileUpload(@UploadedFile() file: Express.Multer.File) {

    if(!file) {
      console.error('파일이 업로드되지 않았습니다.');
      return 'file upload failed...';
    }

    console.log(file);
    // if(file) console.log(file.buffer.toString('utf-8'));

    return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`;   // 업로드한 파일명과 파일 경로 반환
  }

}
