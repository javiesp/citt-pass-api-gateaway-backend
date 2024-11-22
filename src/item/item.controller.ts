import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    @Inject('ITEM_SERVICES') private itemClient: ClientProxy
  ) {}


  @UseGuards(AuthGuard) 
  @Post("/create-item")
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log("crea un product")
    return this.itemService.createItem(createItemDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-items')
  findAllItems() {
    return this.itemService.findAllItems();
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-item/:id')
  findOneItem(@Param('id') id: string) {
    return this.itemService.findOneItem(id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const payload = {
      "id": id,
      "updateItemDto": updateItemDto
    }
    return this.itemService.updateItem(id, updateItemDto)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-item/:id')
  removeItem(@Param('id') id: string) {
    return this.itemService.removeItem(id)
  }
}
