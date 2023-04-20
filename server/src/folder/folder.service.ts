import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve, sep } from 'path';
import * as fs from 'fs';
import { createPath } from 'src/features/createPath';

@Injectable()
export class FolderService {
  createFolder(path: string) {
    try {
      const filePath = createPath(path);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFolder(path: string) {
    try {
      const folderInner = fs.readdirSync(createPath(path));

      return folderInner;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  copyFolder(pathFrom: string, pathTo: string) {
    try {
      fs.readdir(createPath(pathFrom), (error, files) => {
        files.forEach((file) => {
          if (fs.statSync(createPath(pathFrom, file))) {
            this.copyFolder(
              createPath(pathFrom, file),
              createPath(pathTo, file),
            );
          } else {
            fs.copyFileSync(
              createPath(pathFrom, file),
              createPath(pathTo, file),
            );
          }
        });
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFolder(pathFrom: string, pathTo: string) {
    try {
      const folderName = pathFrom.split(sep)[0];
      fs.renameSync(createPath(pathFrom), createPath(pathTo, folderName));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFolder(path) {
    try {
      fs.unlinkSync(createPath(path));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
