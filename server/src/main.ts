import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initFolder } from './features/initFolders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5000',
      'http://localhost:5173',
      'http://localhost:5000',
      'http://client:5000',
      'http://client',
    ],
    credentials: true,
  });
  await app.listen(3000, () => {
    initFolder();
    console.log('SERVER STARTED');
  });
}
bootstrap();
