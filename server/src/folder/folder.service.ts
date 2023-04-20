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

  getFolder(path: string) {
    try {
      const folderInner = fs.readdirSync(createPath(path));
      const result = [];

      folderInner.forEach((file) => {
        const stat = fs.statSync(createPath(path, file));

        const info = { file };
        if (!stat.isDirectory()) {
          info['time'] = Number(stat.mtime);
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
    try {
      const newPath = createPath(pathTo, pathFrom.split(sep).at(-1));

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

      fs.readdir(createPath(pathFrom), (error, files) => {
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
