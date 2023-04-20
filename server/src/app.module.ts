import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [FileModule, FolderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
