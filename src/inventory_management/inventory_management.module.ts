import { Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory_management.service';
import { InventoryManagementController } from './inventory_management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryManagementSchema } from './entities/inventory_management.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InventoryManagement', schema: InventoryManagementSchema }])],
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}