import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [FileModule, FolderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
