import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService,
    @Inject('WISH_LIST_SERVICES') private wishListClient: ClientProxy
  ) {}

  @Post("/create-wish-list")
  createWishList(@Body() createWishListDto: CreateWishListDto) {
    console.log("crea un product")
    return this.wishListClient.send('createWishList', createWishListDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @Get('/find-all-wish-lists')
  findAllWishLists() {
    return this.wishListClient.send('findAllWishLists', {});
  }

  @Get('/find-one-wish-list/:id')
  findOneWishList(@Param('id') id: string) {
    return this.wishListClient.send("findOneWishList", id);
  }

  @Put('/update-wish-list/:id')
  updateWishList(@Param('id') id: string, @Body() updateWishListDto: UpdateWishListDto) {
    const payload = {
      "id": id,
      "updateWishListDto": updateWishListDto
    }
    return this.wishListClient.send("updateWishList", payload)
  }


  @Delete('/delete-wish-list/:id')
  removeWishList(@Param('id') id: string) {
    return this.wishListClient.send('removeWishList', id)
  }
}