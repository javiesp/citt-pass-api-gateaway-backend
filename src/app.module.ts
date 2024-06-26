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
import { WishListModule } from './wish-list/wish-list.module';
import { ItemModule } from './item/item.module';
import { BillLogModule } from './bill_log/bill_log.module';
import { DecreaseModule } from './decrease/decrease.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './users/jwt.guard';


@Module({
  imports: [UsersModule, ProjectModule,ProjectTeamModule, InventoryManagementModule, UserRoleModule, CheckInModule, RoleModule, ProductModule, RackTypeModule, WishListModule, ItemModule, BillLogModule, DecreaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
