import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { InventoryManagementService } from './inventory_management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory_management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory_management.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('inventory-management')
export class InventoryManagementController {
  constructor(private readonly inventoryManagementService: InventoryManagementService) {}


  @Post('create-inventory')
  @UseGuards(AuthGuard) 
  create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
    return this.inventoryManagementService.createInventoryManagement(createInventoryManagementDto);
  }

  @Get('/find-all-inventories')
  @UseGuards(AuthGuard) 
  findAll() {
    return this.inventoryManagementService.findAllInventories();
  }
  
  @Get('/find-one-inventory/:id') 
  @UseGuards(AuthGuard) 
  findOne(@Param('id') id: string) {
    return this.inventoryManagementService.findOneInventory(id);
  }

  @Get('/find-inventory-by-rack-id') 
  @UseGuards(AuthGuard) 
  findOneInventorybyRackid(@Query('rack_id') rack_id: any) {
    return this.inventoryManagementService.findInventoryByRackId(rack_id);
  }

  @Put('/update-inventory/:id')
  @UseGuards(AuthGuard) 
  updateInventory(@Param('id') id: string, @Body() updateInventoryManagementDto: UpdateInventoryManagementDto) { 
    console.log(updateInventoryManagementDto) 
    return this.inventoryManagementService.updateInventory(id, updateInventoryManagementDto);
  }
  
  @Delete('/delete-inventory/:id')
  @UseGuards(AuthGuard) 
  remove(@Param('id') id: string) {
    return this.inventoryManagementService.removeInventorty(id);
  }
}