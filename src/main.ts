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

  const port = parseInt(process.env.PORT, 10) || 3005;
  await app.listen(port, '0.0.0.0');
  console.log(`Gateway is listening on port ${port}`);
}

bootstrap();
