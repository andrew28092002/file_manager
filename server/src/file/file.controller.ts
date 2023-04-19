import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PathFromToDto } from './dto/pathFromTo.dto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get(':path')
  getFile(@Param() path: string) {
    return this.fileService.getFile(path);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') path: string,
  ) {
    return this.fileService.createFile(path, file);
  }

  @Post()
  copyFile(@Body() { pathFrom, pathTo }: PathFromToDto) {
    return this.fileService.copyFile(pathFrom, pathTo);
  }

  @Post()
  moveFile(@Body() { pathFrom, pathTo }: PathFromToDto) {
    return this.fileService.moveFile(pathFrom, pathTo);
  }
}
