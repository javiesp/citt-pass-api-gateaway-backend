import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { InventoryManagementModule } from './inventory_management/inventory_management.module';
import { UserRoleModule } from './user_role/user_role.module';
import { ProjectTeamModule } from './project-team/project-team.module';
import { CheckInModule } from './check-in/check-in.module';

@Module({
  imports: [UsersModule, ProjectModule, InventoryManagementModule, UserRoleModule, CheckInModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
