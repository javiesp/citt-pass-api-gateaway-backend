import { Module } from '@nestjs/common';
import { RackTypeService } from './rack-type.service';
import { RackTypeController } from './rack-type.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RACK_TYPE_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.RACK_TYPE_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.RACK_TYPE_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [RackTypeController],
  providers: [RackTypeService],
})
export class RackTypeModule {}
