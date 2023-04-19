import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve, sep } from 'path';
import * as fs from 'fs'

@Injectable()
export class FolderService {
  createFolder(path: string) {
    try {
      const filePath = resolve(__dirname, '..', 'static', path);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFolder(path: string) {
    try {
      const folderInner = fs.readdirSync(path);

      return folderInner;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  copyFolder(pathFrom: string, pathTo: string) {
    try {
      fs.readdir(pathFrom, (error, files) => {
        files.forEach((file) => {
          if (fs.statSync(resolve(pathFrom, file))) {
            this.copyFolder(resolve(pathFrom, file), resolve(pathTo, file));
          } else {
            fs.copyFileSync(resolve(pathFrom, file), pathTo);
          }
        });
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFolder(pathFrom: string, pathTo: string){
    try{
        const folderName = pathFrom.split(sep)[0]
        fs.renameSync(pathFrom, resolve(pathTo, folderName))
    } catch(e) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
