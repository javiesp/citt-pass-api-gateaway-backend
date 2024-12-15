import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCT_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.PRODUCT_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}