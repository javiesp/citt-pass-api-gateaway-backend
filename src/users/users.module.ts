import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

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
      {
        name: 'PROJECT_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.PROJECT_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.PROJECT_SERVICES_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
