import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InventoryManagementService } from './inventory_management.service';
import { CreateInventoryManagementDto } from './dto/create-inventory_management.dto';
import { UpdateInventoryManagementDto } from './dto/update-inventory_management.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';


@Controller('inventory-management')
export class InventoryManagementController {

  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
    @Inject('INVENTORY_MANAGEMENT_SERVICES') private inventoryManagementClient: ClientProxy,
    
  ) {}


  @UseGuards(AuthGuard) 
  @Post("/create-inventory")
  create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
    console.log("crea inventario")
    return this.inventoryManagementClient.send('createinventory', createInventoryManagementDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-inventories')
  findAll() {
    return this.inventoryManagementClient.send('findAllInventories', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-inventory/:id')
  findOneUser(@Param('id') id: string) {
    return this.inventoryManagementClient.send("findOneInventory", id);
  }
  
  @UseGuards(AuthGuard) 
  @Get('/get-inventory-by-rack-id')
  getByRackId(@Query('rack_id') rack_id: any) {
    return this.inventoryManagementClient.send('getByRackId', rack_id)
  }

  @UseGuards(AuthGuard) 
  @Get('/find-inventory-by-rack-id') 
  findOneInventorybyRackid(@Query('rack_id') rack_id: any) {
    return this.inventoryManagementClient.send("findOneInventorybyRackid", rack_id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-inventory/:id')
  updateInventory(@Param('id') id: string, @Body() updateInventoryManagementDto: UpdateInventoryManagementDto) {
    const payload = {
      "id": id,
      "updateInventoryManagementDto": updateInventoryManagementDto
    }
    return this.inventoryManagementClient.send("updateInventory", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-inventory/:id')
  remove(@Param('id') id: string) {
    return this.inventoryManagementClient.send('removeInventory', id)
  }
}
