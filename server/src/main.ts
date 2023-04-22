import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initFolder } from './features/initFolders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000, () => {
    initFolder()
    console.log('SERVER STARTED')
  });
}
bootstrap();
