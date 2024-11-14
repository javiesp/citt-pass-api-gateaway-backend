import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: string) {
    return `This action returns a #${id} item`;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
