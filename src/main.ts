import { NestFactory } from '@nestjs/core';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

  app.enableCors(corsOptions);

  const userClient: ClientProxy = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: process.env.USERS_SERVICES || 'localhost',
      port: parseInt(process.env.USERS_SERVICES_PORT, 10) || 3006,
    },
  });

  // Asegúrate de guardar el cliente para su uso posterior si es necesario
  app.setGlobalPrefix('api');

  await app.listen(parseInt(process.env.PORT, 10) || 3005, '0.0.0.0');
}

bootstrap();