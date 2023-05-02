/** сервис должен быть отвязан от транспорта  HttpException,HttpStatus говорят о  явной работе с HTTP, 
 * что произойдёт если мы начнём работать по Websocket и начнём получать такие ошибки? */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve, sep } from 'path';
import * as fs from 'fs';
import { createPath } from 'src/features/createPath';
import { error } from 'console';
import { countSize } from 'src/features/countSize';

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

  /** не указан возвращаемый тип  */
  getFolder(path: string) {
    try {
      const folderInner = fs.readdirSync(createPath(path));
      const result = [];

      folderInner.forEach((file) => {
        const stat = fs.statSync(createPath(path, file));
        /** какой тип? */
        const info = { name: file };
        info['time'] = Number(stat.mtime);
         /** для таких вещей лучше тренарник  */
        if (!stat.isDirectory()) {
          info['size'] = stat.size;
        } else {
          info['size'] = countSize(createPath(path, file));
        }

        result.push(info);
      });

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  copyFolder(pathFrom: string, pathTo: string) {
    const pathFromArr = pathFrom.split(sep);
    const pathToArr = pathFrom.split(sep);

    if (pathFromArr[pathFromArr.length - 1] === pathToArr[pathToArr.length - 1])
      throw new HttpException(
        'Нельзя переместить директорию саму в себя',
        HttpStatus.BAD_REQUEST,
      );

    try {
      const newPath = createPath(pathTo, pathFrom.split(sep).at(-1));

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

      fs.readdir(createPath(pathFrom), (error, files) => {
        if (error)
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

        files.forEach((file) => {
          if (fs.statSync(createPath(pathFrom, file)).isDirectory()) {
            this.copyFolder(createPath(pathFrom, file), createPath(newPath));
          } else {
            fs.copyFileSync(
              createPath(pathFrom, file),
              createPath(newPath, file),
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
      const folderName = pathFrom.split(sep).at(-1);
      fs.renameSync(createPath(pathFrom), createPath(pathTo, folderName));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFolder(path) {
    try {
      fs.rmSync(createPath(path), { recursive: true });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
