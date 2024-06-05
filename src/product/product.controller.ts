import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoginAuthDto } from 'src/users/dto/create-user.dto';
import { ClientProxy} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/users/jwt.guard';


@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly jwtService: JwtService,
    @Inject('PRODUCT_SERVICES') private productClient: ClientProxy
  ) {}

  @Post('/login') 
  async loginUser(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string; message: string }> {
    const userData = await this.productClient.send('loginUser', loginAuthDto); 
    
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
  @Post("/create-product")
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log("crea un product")
    return this.productClient.send('createProduct', createProductDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-products')
  findAllProducts() {
    return this.productClient.send('findAllProducts', {});
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-product/:id')
  findOneProduct(@Param('id') id: string) {
    return this.productClient.send("findOneProduct", id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-product/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const payload = {
      "id": id,
      "updateProductDto": updateProductDto
    }
    return this.productClient.send("updateProduct", payload)
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-product/:id')
  removeProduct(@Param('id') id: string) {
    return this.productClient.send('removeProduct', id)
  }
}
