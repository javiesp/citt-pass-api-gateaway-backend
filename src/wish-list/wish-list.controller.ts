import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('wish-list')
export class WishListController {
  constructor(
    private readonly wishListService: WishListService,
    private readonly jwtService: JwtService,
    @Inject('WISH_LIST_SERVICES') private wishListClient: ClientProxy
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.wishListClient.send('loginUser', loginAuthDto); 
    
    if (!userData) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    // Genera el token JWT
    const accessToken = this.generateToken(userData); 

    return { accessToken, message: 'token generado' };
  }

  private generateToken(user: any): string { 
    const payload = { email: user.email, sub: user.id }; 
    return this.jwtService.sign(payload);
  }

  @UseGuards(AuthGuard) 
  @Post("/create-wish-list")
  createWishList(@Body() createWishListDto: CreateWishListDto) {
    console.log("crea un product")
    return this.wishListClient.send('createWishList', createWishListDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
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
