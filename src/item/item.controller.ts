import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly jwtService: JwtService,
    @Inject('ITEM_SERVICES') private itemClient: ClientProxy
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.itemClient.send('loginUser', loginAuthDto); 
    
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
  @Post("/create-item")
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log("crea un product")
    return this.itemClient.send('createItem', createItemDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-items')
  findAllItems() {
    return this.itemClient.send('findAllItems', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-item/:id')
  findOneItem(@Param('id') id: string) {
    return this.itemClient.send("findOneItem", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const payload = {
      "id": id,
      "updateItemDto": updateItemDto
    }
    return this.itemClient.send("updateItem", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-item/:id')
  removeItem(@Param('id') id: string) {
    return this.itemClient.send('removeItem', id)
  }
}
