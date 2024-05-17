import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { InventoryManagementModule } from './inventory_management/inventory_management.module';
import { UserRoleModule } from './user_role/user_role.module';
import { ProjectTeamModule } from './project-team/project-team.module';
import { CheckInModule } from './check-in/check-in.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { RackTypeModule } from './rack-type/rack-type.module';

@Module({
  imports: [UsersModule, ProjectModule, InventoryManagementModule, UserRoleModule, CheckInModule, RoleModule, ProductModule, RackTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
