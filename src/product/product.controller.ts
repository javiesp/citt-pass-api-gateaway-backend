import { Controller, Get, Post, Body, Put, Param, Delete, Inject, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy} from '@nestjs/microservices';
import { AuthGuard } from 'src/users/jwt.guard';


@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICES') private productClient: ClientProxy
  ) {}


  @UseGuards(AuthGuard) 
  @Post("/create-product")
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log("crea un product")
    return this.productService.createProduct(createProductDto);  // la funcion send() envia los datos al decorator @MessagePattern del micro servicio users, ademas del parametro
  }

  @UseGuards(AuthGuard) 
  @Get('/find-all-products')
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @UseGuards(AuthGuard) 
  @Get('/find-one-product/:id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @UseGuards(AuthGuard) 
  @Get('/find-product-by-itemid')
  findProducByItem(@Query('item_id') item_id: number) {
    return this.productService.findProducByItem(item_id);
  }

  @UseGuards(AuthGuard) 
  @Put('/update-product/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const payload = {
      "id": id,
      "updateProductDto": updateProductDto
    }
    return this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard) 
  @Delete('/delete-product/:id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
