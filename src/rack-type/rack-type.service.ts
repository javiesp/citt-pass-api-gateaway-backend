import { Injectable } from '@nestjs/common';
import { CreateRackTypeDto } from './dto/create-rack-type.dto';
import { UpdateRackTypeDto } from './dto/update-rack-type.dto';
import { RackType } from './entities/rack-type.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RackTypeService {
  constructor(@InjectModel(RackType.name) private readonly rackTypeModel: Model<RackType>) {}

  async createRackType(createRackTypeDto: CreateRackTypeDto): Promise<RackType> {
    const createdRackType = new this.rackTypeModel(createRackTypeDto).save();
    console.log(createRackTypeDto)
    return createdRackType;
  }

  async findAllRackTypes() : Promise<RackType[]>{
    return await this.rackTypeModel.find().exec();
  }

  async findOneRackType(id: string): Promise<RackType> {
    return await this.rackTypeModel.findById(id).exec();
  }

  async updateRackType(id: string, updateRackTypeDto: UpdateRackTypeDto): Promise<RackType> {
    return await this.rackTypeModel.findByIdAndUpdate(id, updateRackTypeDto, { new: true }).exec();
  }

  async removeRackType(id: string): Promise<RackType> {
    return await this.rackTypeModel.findByIdAndDelete(id).exec();
  }
}