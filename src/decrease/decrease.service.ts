import { Injectable } from '@nestjs/common';
import { CreateDecreaseDto } from './dto/create-decrease.dto';
import { UpdateDecreaseDto } from './dto/update-decrease.dto';

@Injectable()
export class DecreaseService {
  create(createDecreaseDto: CreateDecreaseDto) {
    return 'This action adds a new decrease';
  }

  findAll() {
    return `This action returns all decrease`;
  }

  findOne(id: number) {
    return `This action returns a #${id} decrease`;
  }

  update(id: number, updateDecreaseDto: UpdateDecreaseDto) {
    return `This action updates a #${id} decrease`;
  }

  remove(id: number) {
    return `This action removes a #${id} decrease`;
  }
}
