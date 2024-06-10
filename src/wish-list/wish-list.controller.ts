import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('wish-list')
export class WishListController {
  constructor(
    private readonly wishListService: WishListService,
    @Inject('WISH_LIST_SERVICES') private wishListClient: ClientProxy
  ) {}

  @Post("/create-wish-list")
  @UseGuards(AuthGuard) 
  createWishList(@Body() createWishListDto: CreateWishListDto) {
    console.log(createWishListDto)
    return this.wishListClient.send('createWishList', createWishListDto); 
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-wish-lists')
  findAllWishLists() {
    return this.wishListClient.send('findAllWishLists', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-wish-list/:id')
  findOneWishList(@Param('id') id: string) {
    return this.wishListClient.send("findOneWishList", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-wish-list/:id')
  updateWishList(@Param('id') id: string, @Body() updateWishListDto: UpdateWishListDto) {
    const payload = {
      "id": id,
      "updateWishListDto": updateWishListDto
    }
    return this.wishListClient.send("updateWishList", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-wish-list/:id')
  removeWishList(@Param('id') id: string) {
    return this.wishListClient.send('removeWishList', id)
  }
}
