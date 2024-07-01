import { Module } from '@nestjs/common';
import { RackTypeService } from './rack-type.service';
import { RackTypeController } from './rack-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RackTypeSchema } from './entities/rack-type.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'RackType', schema: RackTypeSchema }])],
  controllers: [RackTypeController],
  providers: [RackTypeService],
})
export class RackTypeModule {}