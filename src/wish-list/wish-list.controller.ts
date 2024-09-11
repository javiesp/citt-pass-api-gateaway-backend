import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';
import { ProductDto } from './dto/product.dto';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Post('create-wishList-type')
  @UseGuards(AuthGuard) 
  create(@Body() createWishListDto: CreateWishListDto) {
    console.log('asi se recibe', createWishListDto)
    return this.wishListService.createWishList(createWishListDto);
  }

  @Get('/find-all-wishList-types')
  @UseGuards(AuthGuard) 
  findAll() {
    return this.wishListService.findAllWishLists();
  }

  @Get('/find-one-wishList-type/:id') 
  @UseGuards(AuthGuard) 
  findOne(@Param('id') id: string) {
    return this.wishListService.findOneWishList(id);
  }

  @Put('/update-wishList-type/:id')
  @UseGuards(AuthGuard) 
  update(@Param('id') id: string, @Body() updateWishListDto: UpdateWishListDto) { 
    console.log("PASS") 
    console.log(updateWishListDto.budget) 
    return this.wishListService.updateWishList(id, updateWishListDto);
  }

  @Put('/update-wishList-product/:id')
  @UseGuards(AuthGuard)
  async updateWishListProduct(@Param('id') wishlistId: string, @Body() updateProductDto: ProductDto) {
    console.log("NOPASS") 
    return this.wishListService.updateWishListProduct(wishlistId, updateProductDto);
  }

  @Delete('/delete-wishList-type/:id')
  @UseGuards(AuthGuard) 
  remove(@Param('id') id: string) {
    return this.wishListService.removeWishList(id);
  }
} 