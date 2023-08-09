import {randomUUID} from "crypto";
import {diskStorage} from "multer";
import {extname, join} from 'path';

// extname 은 확장자명

export const multerOptions = {
    storage: diskStorage({                        // 디스크 스토리지 사용
        destination: join(__dirname, '..', 'uploads'),   // 파일 저장 경로 설
        filename: (req, file, callback) => {             // 파일명 설정
            callback(null, randomUUID() + extname(file.originalname));
        },
    }),
};