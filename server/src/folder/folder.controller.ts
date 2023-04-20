import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PathFromToDto } from './dto/pathFromTo.dto';

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Post('/create')
  createFolder(@Body('path') path: string) {
    return this.folderService.createFolder(path);
  }

  @Post('/get')
  getFolder(@Body('path') path: string) {
    return this.folderService.getFolder(path);
  }

  @Post('/copy')
  copyFolder(@Body() { pathFrom, pathTo }: PathFromToDto) {
    return this.folderService.copyFolder(pathFrom, pathTo);
  }

  @Post('/move')
  moveFolder(@Body() { pathFrom, pathTo }: PathFromToDto) {
    return this.folderService.moveFolder(pathFrom, pathTo);
  }

  @Post('/delete')
  deleteFolder(@Body('path') path: string) {
    return this.folderService.deleteFolder(path);
  }
}
