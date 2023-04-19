import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve, sep } from 'path';

@Injectable()
export class FileService {
  createFile(path: string, file: Express.Multer.File) {
    try {
      const fileName = file.originalname;
      const filePath = resolve(__dirname, '..', 'static', path);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(resolve(filePath, fileName), file.buffer);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFile(path: string) {
    try {
      const fileContent = fs.readFileSync(path);

      return fileContent;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  copyFile(pathFrom: string, pathTo: string) {
    try {
      fs.copyFileSync(pathFrom, pathTo);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFile(pathFrom: string, pathTo: string){
    try{
        fs.renameSync(pathFrom, pathTo)
    } catch(e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
