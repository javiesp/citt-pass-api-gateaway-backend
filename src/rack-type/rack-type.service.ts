import { Injectable } from '@nestjs/common';
import { CreateRackTypeDto } from './dto/create-rack-type.dto';
import { UpdateRackTypeDto } from './dto/update-rack-type.dto';

@Injectable()
export class RackTypeService {
  create(createRackTypeDto: CreateRackTypeDto) {
    return 'This action adds a new rackType';
  }

  findAll() {
    return `This action returns all rackType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rackType`;
  }

  update(id: number, updateRackTypeDto: UpdateRackTypeDto) {
    return `This action updates a #${id} rackType`;
  }

  remove(id: number) {
    return `This action removes a #${id} rackType`;
  }
}
