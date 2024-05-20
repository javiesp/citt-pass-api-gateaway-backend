import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService,

  @Inject('ITEM_SERVICES') private itemClient: ClientProxy
  ) {}

  @Post("/create-item")
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log("crea un product")
    return this.itemClient.send('createItem', createItemDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-items')
  findAllItems() {
    return this.itemClient.send('findAllItems', {});
  }

  @Get('/find-one-item/:id')
  findOneItem(@Param('id') id: string) {
    return this.itemClient.send("findOneItem", id);
  }

  @Put('/update-item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const payload = {
      "id": id,
      "updateItemDto": updateItemDto
    }
    return this.itemClient.send("updateItem", payload)
  }


  @Delete('/delete-item/:id')
  removeItem(@Param('id') id: string) {
    return this.itemClient.send('removeItem', id)
  }
}
