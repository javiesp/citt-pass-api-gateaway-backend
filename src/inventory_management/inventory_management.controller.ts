import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Put } from '@nestjs/common';
import { InventoryManagementService } from './inventory_management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory_management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory_management.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('inventory-management')
export class InventoryManagementController {

  constructor(private readonly inventoryManagementService: InventoryManagementService,
    @Inject('INVENTORY_MANAGEMENT_SERVICES') private inventoryManagementClient: ClientProxy,

  ) {}

  @Post("/create-inventory")
  create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
    console.log("crea inventario")
    return this.inventoryManagementClient.send('createinventory', createInventoryManagementDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-inventories')
  findAll() {
    return this.inventoryManagementClient.send('findAllInventories', {});
  }

  @Get('/find-one-inventory/:id')
  findOneUser(@Param('id') id: string) {
    return this.inventoryManagementClient.send("findOneInventory", id);
  }

  @Get('/find-inventory-by-rack-id') 
  findOneInventorybyRackid(@Query('rack_id') rack_id: any) {
    return this.inventoryManagementClient.send("findOneInventorybyRackid", rack_id);
  }

  @Put('/update-inventory/:id')
  updateInventory(@Param('id') id: string, @Body() updateInventoryManagementDto: UpdateInventoryManagementDto) {
    const payload = {
      "id": id,
      "updateInventoryManagementDto": updateInventoryManagementDto
    }
    return this.inventoryManagementClient.send("updateInventory", payload)
  }


  @Delete('/delete-inventory/:id')
  remove(@Param('id') id: string) {
    return this.inventoryManagementClient.send('removeInventory', id)
  }
}
