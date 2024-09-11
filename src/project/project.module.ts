import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './entities/project.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: projectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}