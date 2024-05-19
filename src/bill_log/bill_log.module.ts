import { Module } from '@nestjs/common';
import { BillLogService } from './bill_log.service';
import { BillLogController } from './bill_log.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'BILL_LOG_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.BILL_LOG_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.BILL_LOG_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [BillLogController],
  providers: [BillLogService],
})
export class BillLogModule {}
