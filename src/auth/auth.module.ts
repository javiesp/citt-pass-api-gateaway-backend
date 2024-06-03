import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICES, 
          port: parseInt(process.env.USERS_SERVICES_PORT), 
        },
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
