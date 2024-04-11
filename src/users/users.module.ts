import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.USERS_SERVICES_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
