import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { InventoryManagementModule } from './inventory_management/inventory_management.module';
import { ProjectTeamModule } from './project-team/project-team.module';

@Module({
  imports: [UsersModule, ProjectModule, InventoryManagementModule, ProjectTeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
