import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
  ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'WISH_LIST_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.WISH_LIST_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.WISH_LIST_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}
