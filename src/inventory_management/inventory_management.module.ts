import { Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory_management.service';
import { InventoryManagementController } from './inventory_management.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'INVENTORY_MANAGEMENT_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.INVENTORY_MANAGEMENT_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.INVENTORY_MANAGEMENT_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}
