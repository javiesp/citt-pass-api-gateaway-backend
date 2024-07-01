import { Injectable } from '@nestjs/common';
import { CreateInventoryManagementDto } from './dto/create-inventory_management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory_management.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InventoryManagement } from './entities/inventory_management.entity';
import { Model } from 'mongoose';

@Injectable()
export class InventoryManagementService {
  constructor(@InjectModel(InventoryManagement.name) private readonly inventoryManagementModel: Model<InventoryManagement>) {}

  async createInventoryManagement(createInventoryManagementDto: CreateInventoryManagementDto): Promise<InventoryManagement> {
    const createdInventoryManagement = new this.inventoryManagementModel(createInventoryManagementDto).save();
    console.log(createInventoryManagementDto)
    return createdInventoryManagement;
  }

  async findAllInventories() : Promise<InventoryManagement[]>{
    return await this.inventoryManagementModel.find().exec();
  }

  async findOneInventory(id: string): Promise<InventoryManagement> {
    return await this.inventoryManagementModel.findById(id).exec();
  }

  async findInventoryByRackId(rack_id: string): Promise<InventoryManagement[]> {
    return this.inventoryManagementModel.find({ rack_id }).exec();
  }

  async updateInventory(id: string, updateInventoryManagementDto: UpdateInventoryManagementDto): Promise<InventoryManagement> {
    return await this.inventoryManagementModel.findByIdAndUpdate(id, updateInventoryManagementDto, { new: true }).exec();
  }


  async removeInventorty(id: string): Promise<InventoryManagement> {
    return await this.inventoryManagementModel.findByIdAndDelete(id).exec();
  }
}