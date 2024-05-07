import { Module } from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { ProjectTeamController } from './project-team.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PROJECT_SERVICES', 
        transport: Transport.TCP,
        options: {
          host: process.env.PROJECT_SERVICES, // el host de la carpeta .env (localhost)
          port: parseInt(process.env.PROJECT_SERVICES_PORT), // el puerto de la carpeta .env (ej: 3000)
        },
      },
    ]),
  ],
  controllers: [ProjectTeamController],
  providers: [ProjectTeamService],
})
export class ProjectTeamModule {}
