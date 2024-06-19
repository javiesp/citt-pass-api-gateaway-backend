import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3005, '0.0.0.0');
}

bootstrap();