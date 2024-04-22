import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [UsersModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
