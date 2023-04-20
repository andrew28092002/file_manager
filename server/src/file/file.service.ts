import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { resolve, sep } from 'path';
import { createPath } from 'src/features/createPath';

@Injectable()
export class FileService {
  createFile(path: string, file: Express.Multer.File) {
    try {
      const fileName = file.originalname;
      const filePath = createPath(path);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(createPath(filePath, fileName), file.buffer);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFile(path: string) {
    try {
      const fileContent = fs.readFileSync(createPath(path));

      return fileContent;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  copyFile(pathFrom: string, pathTo: string) {
    try {
      const fileName = pathFrom.split(sep).at(-1);

      fs.copyFileSync(createPath(pathFrom), createPath(pathTo, fileName));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFile(pathFrom: string, pathTo: string) {
    try {
      const fileName = pathFrom.split(sep).at(-1);
      
      fs.renameSync(createPath(pathFrom), createPath(pathTo, fileName));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFile(path: string) {
    try {
      fs.unlinkSync(createPath(path));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
