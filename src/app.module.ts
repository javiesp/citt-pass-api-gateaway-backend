import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { InventoryManagementModule } from './inventory_management/inventory_management.module';
import { UserRoleModule } from './user_role/user_role.module';

@Module({
  imports: [UsersModule, ProjectModule, InventoryManagementModule, UserRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
