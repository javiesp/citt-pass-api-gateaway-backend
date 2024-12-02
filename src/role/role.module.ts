import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.USERS_SERVICES_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
