import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initFolder } from './features/initFolders';
import { insertTestData } from './features/insertTestData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000, () => {
    initFolder()
    // insertTestData()
    console.log('SERVER STARTED')
  });
}
bootstrap();
