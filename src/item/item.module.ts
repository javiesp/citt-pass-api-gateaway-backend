import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ITEM_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.ITEM_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.ITEM_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
