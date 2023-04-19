import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PathFromToDto } from './dto/pathFromTo.dto';

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Post()
  createFolder(@Body('path') path: string) {
    return this.folderService.createFolder(path);
  }

  @Get('/folder/:path')
  getFolder(@Param() path: string) {
    return this.folderService.getFolder(path);
  }

  @Post()
  copyFolder(
    @Body() { pathFrom, pathTo }: PathFromToDto,
  ) {
    return this.folderService.copyFolder(pathFrom, pathTo);
  }

  @Post()
  moveFolder(
    @Body() { pathFrom, pathTo }: PathFromToDto,
  ) {
    return this.folderService.moveFolder(pathFrom, pathTo);
  }
}
