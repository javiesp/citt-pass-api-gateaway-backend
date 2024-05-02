import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_ROLE_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.USER_ROLE_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.USER_ROLE_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
