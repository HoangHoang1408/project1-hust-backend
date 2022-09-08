import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_DOMAIN,
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap().then(() => {
  console.log('App started');
});
