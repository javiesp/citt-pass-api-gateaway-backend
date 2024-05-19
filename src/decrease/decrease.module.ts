import { Module } from '@nestjs/common';
import { DecreaseService } from './decrease.service';
import { DecreaseController } from './decrease.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'DECREASE_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.DECREASE_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.DECREASE_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [DecreaseController],
  providers: [DecreaseService],
})
export class DecreaseModule {}
