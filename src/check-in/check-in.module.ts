import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'CHECK_IN_SERVICE', 
        transport: Transport.TCP,
        options: {
          host: process.env.CHECK_IN_SERVICE, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.CHECK_IN_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
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
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
